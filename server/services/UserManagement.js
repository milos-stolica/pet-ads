const UserModel = require('../models/UserModel');
const Validator = require('../validators');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const util = require('util');
const { saltRounds } = require('../enums_regex');
const path = require('path');
const ImageController = require('./ImageController');
const jsonWebToken = require('jsonwebtoken');

const hashPassword = util.promisify(bcrypt.hash);
const jwtSign = util.promisify(jsonWebToken.sign);
const jwtVerify = util.promisify(jsonWebToken.verify);
const projectUser = (user) => {
  return {
    ads: user.ads,
    subscriptions: user.subscriptions,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image_name: user.image_name
  }
}

module.exports = class UserManagement {
  constructor(req, action) {
    this.req = req;
    this.action = action;
    this.valid = this.validate();
    this.addressTaken = true;
    this.imgDestination = path.join(__dirname, '../public', 'users_images');
    this.imgSaver = this.req.file ? new ImageController(this.req.file.buffer, this.imgDestination, null) : null;
    this.user = null;
  }

  validate() {
    const validateForRegistration = () => {
      if(!this.req.body || !this.req.file) {
        return false;
      }

      return Validator.isRegistrationFormValid({
        email: this.req.body.email,
        firstName: this.req.body.firstName,
        lastName: this.req.body.lastName,
        password: this.req.body.password
      });
    }

    const validateEmailAndPassword = () => {
      if(!this.req.body) {
        return false;
      }
      
      return Validator.isLoginFormValid({
        email: this.req.body.email,
        password: this.req.body.password
      });
    }

    let valid = false;
    if(this.action === 'registration') {
      valid = validateForRegistration();
    } else if(this.action === 'login') {
      valid = validateEmailAndPassword();
    }
    return valid;
  }

  tryGetUserData() {
    return new Promise((resolve, reject) => {
      if(this.user) return resolve(this.user);
      if(!this.valid) return reject(createError(400, 'Validation failed'));
      UserModel.findOne({email: this.req.body.email}, (err, user) => {
        if(err) return reject(err);
        if(!user) return reject(createError(400, 'Validation failed'));
        bcrypt.compare(this.req.body.password, user.password)
        .then(correct => {
          correct ? resolve(projectUser(user)) : reject(createError(401, 'Unauthorized'));
        })
        .catch(err => reject(err));
      });
    });
  }

  async tryGenerateToken() {
    try {
      this.user = await this.tryGetUserData();
      if(!this.user) return null;
      const token = await jwtSign({}, process.env.SECRET, { subject: `${this.user._id}` });
      return token;
    } catch(err) {
      throw err;
    }
  }

  addressInUse() {
    return new Promise((resolve, reject) => {
      UserModel.countDocuments({email: this.req.body.email}, (err, count) => {
        if(err) reject(err);
        if(count === 0) {
          this.addressTaken = false;
        }
        resolve(this.addressTaken);
      });
    });
  }

  saveUser() {
    return new Promise(async(resolve, reject) => {
      if(this.valid && !this.addressTaken) {
        try {
          const [hashedPassword, ] = await Promise.all([hashPassword(this.req.body.password, saltRounds), this.imgSaver.saveImage()]);
          const userData = {
            firstName: this.req.body.firstName,
            lastName: this.req.body.lastName,
            email: this.req.body.email,
            password: hashedPassword,
            image_name: this.imgSaver.getImgName(),
            ads: []
          };
          const user = new UserModel(userData);
          user.save((err, userDoc) => {
            if(err) return reject(err);
            resolve(projectUser(userDoc));
          });
        } catch(err) {
          reject(err);
        }
      } else {
        reject(createError(400, 'Validation failed'));
      }
    });
  }

  static tryGetUserData(req, shouldProjectUser) {
    return new Promise(async(resolve) => {
      const token = req.cookies.jsonWebToken;
      if(token) {
        try {
          const data = await jwtVerify(token, process.env.SECRET);
          if(!data) return resolve(null);
          UserModel.findById(data.sub, (err, user) => {
            if(err) throw err;
            if(!user) return resolve(null);
            return shouldProjectUser ? resolve(projectUser(user)) : resolve(user);
          });
        } catch (err) {
          throw err;
        } 
      } else {
        return resolve(null);
      }
    });
  }

  static async doesUserHasPermision(req, manipulationType) {
    const user = await this.tryGetUserData(req, true);
    if(manipulationType === 'adManipulation') return user.ads.includes(req.resourceId);
    if(manipulationType === 'subscriptionManipulation') return user.subscriptions.includes(req.resourceId);
  }
}