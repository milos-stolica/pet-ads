const AdPetModel = require('../models/AdPetModel');
const Validator = require('../validators');
const createError = require('http-errors');
const path = require('path');
const ImageController = require('./ImageController');

module.exports = class AdsManager {
  constructor(req, action) {
    this.req = req;
    this.valid = this.validate();
    this.action = action;
    this.imgDestination = this.req.body ? path.join(__dirname, '../public', 'ads_images', this.req.body.ad_type) : null;
    this.imgSaver = this.req.file ? new ImageController(this.req.file.buffer, this.imgDestination, null) : null;
  }

  validate() {
    if(!this.req.body || (!this.req.file && this.action === 'saving')) {
      return false;
    }

    let valid = Validator.adTypeValid(this.req.body.ad_type) && Validator.onlyLetters(this.req.body.city) && Validator.onlyLetters(this.req.body.state)
    && Validator.isPhoneValid(this.req.body.phone) && Validator.isEmailValid(this.req.body.email) && Validator.petTypeValid(this.req.body.type)
    && Validator.lengthInRange(this.req.body.phone, 0, 50) && Validator.lengthInRange(this.req.body.city, 0, 50) && Validator.lengthInRange(this.req.body.state, 0, 50)
    && Validator.lengthInRange(this.req.body.description);

    if(valid && this.req.body.ad_type === 'Sell' && !Validator.valueInRange(this.req.body.price, 0)) {
      valid = false;
    }
    return valid;
  }

  getAds() {
    return new Promise((resolve, reject) => {
      AdPetModel.find((err, ads) => {
        if(err) return reject(err);
        return resolve(ads);
      });
    });
  }

  getAdById() {
    return new Promise((resolve, reject) => {
      AdPetModel.findById(this.req.query.id, (err, ad) => {
        if(err) return reject(err);
        return resolve(ad);
      });
    });
  }

  update() {
    const tryChangeImage = () => {
      return new Promise((resolve, reject) => {
        AdPetModel.findById(this.req.body.id, async (err, ad) => {
          if(err) return reject(err);
          try {
            if(this.req.file) {
              //delete previously saved image and save new one
              ImageController.deleteImage(path.join(__dirname, '../public', 'ads_images', ad.ad_type, ad.image_name));
              await this.imgSaver.saveImage();
            } else if (ad.ad_type !== this.req.body.ad_type){
              //only destination for image is changed
              const oldPath = path.join(__dirname, '../public', 'ads_images', ad.ad_type, ad.image_name);
              const newPath = path.join(__dirname, '../public', 'ads_images', this.req.body.ad_type, ad.image_name);
              await ImageController.moveImage(oldPath, newPath);
            }
            return resolve(null);
          } catch(err) {
            return reject(err);
          }
        });
      });
    }
    return new Promise(async(resolve, reject) => {
      if(this.valid) {
        try {
          const ad = this.constructAd();
          await tryChangeImage();
          AdPetModel.findOneAndUpdate({ _id: this.req.body.id }, ad, { new: true }, (err, ad) => {
            if(err) return reject(err);
            return resolve(ad);
          });
        } catch (err) {
          return reject(err);
        }
      } else {
        return reject(createError(400, 'Validation failed'));
      }
    });  
  }

  save() {
    return new Promise(async(resolve, reject) => {
      if(this.valid) {
        try {
          const ad = this.constructAd();
          await this.saveImage();
          const adPetDoc = new AdPetModel(ad);
          adPetDoc.save((err, adPet) => {
            if(err) return reject(err);
            return resolve(adPet);
          });
        } catch (err) {
          return reject(err);
        }
      } else {
        return reject(createError(400, 'Validation failed'));
      }
    });
  }

  saveImage() {
    return new Promise(async(resolve, reject) => {
      try{
        await this.imgSaver.saveImage();
        return resolve(null);
      }
      catch(err) {
        return reject(err);
      }
    });
  }

  //TODO make this inaccessable out of this class
  constructAd() {
    const ad = {
      description:this.req.body.description, 
      type: this.req.body.type,
      city: this.req.body.city,
      state: this.req.body.state,
      phone: this.req.body.phone,
      email: this.req.body.email,
      ad_type: this.req.body.ad_type
    }
    const price = parseFloat(this.req.body.price);
    if(!isNaN(price)) {
      ad.price = price;
    }

    if(this.action === 'saving' || (this.req.file && this.action === 'updating')) {
      ad.image_name = this.imgSaver.getImgName();
    }
    return ad;
  }
}