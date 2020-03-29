const AdPetModel = require('../models/AdPetModel');
const Validator = require('../validators');
const createError = require('http-errors');

class AdsManager {
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

    const valid = Validator.adTypeValid(this.req.body.ad_type) && Validator.onlyLetters(this.req.body.city) && Validator.onlyLetters(this.req.body.state)
    && Validator.isPhoneValid(req.body.phone) && Validator.isEmailValid(req.body.email) && Validator.petTypeValid(req.body.type)
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
        if(err) reject(err);
        resolve(ads);
      });
    });
  }

  getAdById() {
    return new Promise((resolve, reject) => {
      AdPetModel.findById(this.req.query.id, (err, ad) => {
        if(err) reject(err);
        resolve(ad);
      });
    });
  }

  update() {
    return new Promise(async(resolve, reject) => {
      if(this.valid) {
        try {
          const ad = this.constructAd();
          await this.tryChangeImage();
          AdPetModel.findOneAndUpdate({ _id: this.req.body.id }, ad, { new: true }, (err, ad) => {
            if(err) reject(err);
            resolve(ad);
          });
        } catch (err) {
          reject(err);
        }
      } else {
        reject(createError(400, 'Validation failed'));
      }
    });  
  }

  save() {
    return new Promise((resolve, reject) => {
      if(this.valid) {
        try {
          const ad = this.constructAd();
          await this.saveImage();
          const adPetDoc = new AdPetModel(ad);
          adPetDoc.save((err, adPet) => {
            if(err) reject(err);
            resolve(adPet);
          });
        } catch (err) {
          reject(err);
        }
      } else {
        reject(createError(400, 'Validation failed'));
      }
    });
  }

  tryChangeImage() {
    return new Promise((resolve, reject) => {
      AdPetModel.findById(this.req.body.id, async (err, ad) => {
        if(err) reject(err);
        try {
          if(this.req.file) {
            //delete previously saved image
            ImageController.deleteImage(path.join(__dirname, '../public', 'ads_images', ad.ad_type, ad.image_name));
            await this.imgSaver.saveImage();
          } else if (ad.ad_type !== this.req.body.ad_type){
            const oldPath = path.join(__dirname, '../public', 'ads_images', ad.ad_type, ad.image_name);
            const newPath = path.join(__dirname, '../public', 'ads_images', this.req.body.ad_type, ad.image_name);
            await ImageController.moveImage(oldPath, newPath);
          }
          resolve(null);
        } catch(err) {
          reject(err);
        }
      });
    });
  }

  saveImage() {
    return new Promise((resolve, reject) => {
      try{
        await this.imgSaver.saveImage();
        resolve(null);
      }
      catch(err) {
        reject(err);
      }
    });
  }

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