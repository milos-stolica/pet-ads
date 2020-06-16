const AdPetModel = require('../models/AdPetModel');
const Validator = require('../validators');
const createError = require('http-errors');
const path = require('path');
const ImageController = require('./ImageController');

module.exports = class AdsManager {
  constructor(req, action) {
    this.req = req;
    this.action = action;
    this.valid = this.validate();
    this.imgDestination = this.req.body ? path.join(__dirname, '../public', 'ads_images', this.req.body.ad_type) : null;
    this.imgSaver = this.req.file ? new ImageController(this.req.file.buffer, this.imgDestination, null) : null;
  }

  validate() {
    if(!this.req.body || (!this.req.file && this.action === 'saving')) {
      return false;
    }

    return Validator.isAdFormValid({
      phone: this.req.body.phone,
      city: this.req.body.city,
      state: this.req.body.state,
      adType: this.req.body.ad_type,
      petType: this.req.body.type,
      ...(this.req.body.description && { description: this.req.body.description }),
      ...(this.req.body.ad_type === 'For sale' && { price: this.req.body.price})
    });
  }

  getAds() {
    return AdPetModel.find().sort({updatedAt: -1}).lean();
  }

  getAdById() {
    return AdPetModel.findById(this.req.query.id);
  }

  //TODO delete price when ad type is changed from For sale to other
  async update() {
    if(!this.valid) return Promise.reject(createError(400, 'Validation failed'));

    const shouldUpdateImageOrLocation = (ad) => {
      return this.req.file || (ad.ad_type !== this.req.body.ad_type);
    }

    const tryUpdateImage = async () => {
      try {
        const ad = await AdPetModel.findById(this.req.body.id);
        if(!shouldUpdateImageOrLocation(ad)) Promise.resolve(false);
        if(this.req.file) {
          //save new one and delete previously saved image
          await this.saveImage();
          const adDirectory = ad.ad_type !== this.req.body.ad_type ? ad.ad_type : this.req.body.ad_type;
          await ImageController.deleteImage(path.join(__dirname, '../public', 'ads_images', adDirectory, ad.image_name));
        } else if (ad.ad_type !== this.req.body.ad_type){
          //only destination for image is changed
          const oldPath = path.join(__dirname, '../public', 'ads_images', ad.ad_type, ad.image_name);
          const newPath = path.join(__dirname, '../public', 'ads_images', this.req.body.ad_type, ad.image_name);
          await ImageController.moveImage(oldPath, newPath);
        }
        return Promise.resolve(true);
      } catch(err) {
        return Promise.reject(err);
      }
    }

    try {
      await tryUpdateImage();
      const ad = this.constructAd();
      const updatedAd = await AdPetModel.findByIdAndUpdate(this.req.body.id, ad, { new: true });
      return Promise.resolve(updatedAd);
    } catch (err) {
      return Promise.reject(err);
    }   
  }

  async save() {
    if(!this.valid) return Promise.reject(createError(400, 'Validation failed'));
    try {
      const ad = this.constructAd();
      const adPetDoc = new AdPetModel(ad);
      const [adPet, ] = await Promise.all([adPetDoc.save(), this.saveImage()]);
      return Promise.resolve(adPet);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async delete() {
    if(!this.req.params.id) return Promise.reject(createError(400, 'Bad request'));
    try {
      const deleted = await AdPetModel.findByIdAndDelete(this.req.params.id);
      return Promise.resolve(deleted);
    } catch (err) {
      Promise.reject(err);
    }  
  }

  saveImage() {
    return this.imgSaver.saveImage();
  }

  //TODO make this inaccessible out of this class
  constructAd() {
    const ad = {
      description: this.req.body.description, 
      type: this.req.body.type,
      city: this.req.body.city,
      state: this.req.body.state,
      phone: this.req.body.phone,
      email: this.req.body.email,
      ad_type: this.req.body.ad_type,
      ownerId: this.req.user._id
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