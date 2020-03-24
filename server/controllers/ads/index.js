const AdPetModel = require('../../models/AdPetModel');
const { mongodbObjectId } = require('../../enums_regex');
const createError = require('http-errors');
const ImageController = require('../../services/ImageController');
const Validator = require('../../validators');
const MulterUploader = require('../../services/MulterUploader');
const path = require('path');

const upload = MulterUploader.upload('file');

const getAds = (req, res, next) => {
  const id = req.query.id
  if(id) {
    //return one by id
    if(!mongodbObjectId.test(id)) {
      return next(createError(400, 'Validation failed'));
    }
    AdPetModel.findById(id, (err, ad) => {
      if(err) return next(err);
      if(!ad) return next(createError(400, 'Ad not found'));
      res.json(ad);
    });
  } else {
    //return all
    AdPetModel.find((err, ads) => {
      if(err) return next(err);
      res.json(ads);
    });
    
  }
}

const updateAd = (imageUploader) => {
  return (req, res, next) => {
    //Ako se mijenjala, izbrisati staru. Desava se da ne postoji izabrana slika, pa ishendlati na klijentu i serveru na pravi
    //to do promijeniti lokaciju slike ako se promijenio tip oglasa, staviti je u odgovarajuci folder
    upload(req, res, (err) => {
      if(err) {
        return next(MulterUploader.handleError(err));
      }
  
      if(!mongodbObjectId.test(req.body.id)) {
        return next(createError(400, 'Validation failed'));
      }
      AdPetModel.findById(req.body.id, async (err, ad) => {
        if(err) return next(err);
        if(!ad) return next(createError(400, 'Ad not found'));
        
        let valid = Validator.adTypeValid(req.body.ad_type) && Validator.onlyLetters(req.body.city) && Validator.onlyLetters(req.body.state)
                  && Validator.isPhoneValid(req.body.phone) && Validator.isEmailValid(req.body.email) && Validator.petTypeValid(req.body.type)
                  && Validator.lengthInRange(req.body.phone, 0, 50) && Validator.lengthInRange(req.body.city, 0 , 50) && Validator.lengthInRange(req.body.state, 0 , 50)
                  && Validator.lengthInRange(req.body.description);
  
        if(valid && req.body.ad_type === 'Sell' && !Validator.valueInRange(req.body.price, 0)) {
          valid = false;
        }
  
        if(!valid) {
          return next(createError(400, 'Validation failed'));
        }
  
        const updatedAd = {
          description: req.body.description,
          type: req.body.type,
          city: req.body.city,
          state: req.body.state,
          phone: req.body.phone,
          email: req.body.email,
          ad_type: req.body.ad_type,
        }
  
        if(!isNaN(+req.body.price)) {
          updatedAd.price = +req.body.price;
        }
  
        let image_name;
        //if there is not any image uploaded it means that image should remain unchanged
        if(req.file) {
          ImageController.deleteImage(path.join(__dirname, '../../public', 'ads_images', ad.ad_type, ad.image_name));
          const imgSaver = new ImageController(req.file.buffer, req.body.ad_type, imageUploader);
          try
          {
            //await image to be saved before send response to client
            await imgSaver.saveImage(); 
          } catch(err) {
            return next(err);
          }
          image_name = imgSaver.getImgName();
        } else if (ad.ad_type !== req.body.ad_type) {
          const oldPath = path.join(__dirname, '../../public', 'ads_images', ad.ad_type, ad.image_name);
          const newPath = path.join(__dirname, '../../public', 'ads_images', req.body.ad_type, ad.image_name);
          //await image to be moved to another folder before send response to client
          await ImageController.moveImage(oldPath, newPath)
        }
        const adForSaving = image_name != undefined ? { ...updatedAd, image_name } : updatedAd;
        AdPetModel.findOneAndUpdate({ _id: req.body.id}, adForSaving, { new: true }, (err, ad) => {
          if(err) return next(err);
          res.json(ad);
        });
      });
    });
  }
}

const saveAd = (imageUploader) => {
  return (req, res, next) => {
    upload(req, res, async (err) => {
      if(!req.file) {
        return next(createError(400, 'Validation failed.'));
      }
  
      if(err) {
        return next(MulterUploader.handleError(err));
      }
  
      let valid = Validator.adTypeValid(req.body.ad_type) && Validator.onlyLetters(req.body.city) && Validator.onlyLetters(req.body.state)
                    && Validator.isPhoneValid(req.body.phone) && Validator.isEmailValid(req.body.email) && Validator.petTypeValid(req.body.type)
                    && Validator.lengthInRange(req.body.phone, 0, 50) && Validator.lengthInRange(req.body.city, 0 , 50) && Validator.lengthInRange(req.body.state, 0 , 50);
  
      if(valid && req.body.ad_type === 'sell' && !Validator.valueInRange(req.body.price, 0)) {
        valid = false;
      }
  
      if(!valid) {
        return next(createError(400, 'Validation failed'));
      }
  
      const adForSave = {
        description: req.body.description,
        type: req.body.type,
        city: req.body.city,
        state: req.body.state,
        phone: req.body.phone,
        email: req.body.email,
        ad_type: req.body.ad_type,
      }
  
      if(!isNaN(+req.body.price)) {
        adForSave.price = +req.body.price;
      }
  
      const imgSaver = new ImageController(req.file.buffer, req.body.ad_type, imageUploader);
      try{
        await imgSaver.saveImage();
      }
      catch(err) {
        return next(err);
      }
      
      const adPet = {...adForSave, image_name: imgSaver.getImgName()}
      const adPetDoc = new AdPetModel(adPet);
      adPetDoc.save((err, document) => {
        if(err) return next(err);
        res.json(document)
      });
    });
  }
}

const deleteAd = (req, res, next) => {

}

module.exports = {
  getAds, 
  updateAd,
  saveAd,
  deleteAd
}