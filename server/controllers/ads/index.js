const MulterUploader = require('../../services/MulterUploader');
const AdsManager = require('../../services/AdsManager');

const upload = MulterUploader.upload('file');

const getAds = async(req, res, next) => {
  const id = req.query.id
  const adsManager = new AdsManager(req, 'get');
  if(id) {
    //return one by id
    try {
      const ad = await adsManager.getAdById();
      return res.json(ad);
    } catch (err) {
      return next(err);
    }
  } else {
    //return all
    try {
      const ads = await adsManager.getAds();
      return res.json(ads);
    } catch (err) {
      return next(err);
    }
  }
}

const updateAd = (req, res, next) => {
  upload(req, res, async(err) => {
    if(err) {
      return next(MulterUploader.handleError(err));
    }
    try {
      const adsManager = new AdsManager(req, 'updating');
      const ad = await adsManager.update();
      res.json(ad);
    } catch (err) {
      next(err);
    }
  });
}

const saveAd = (req, res, next) => {
  upload(req, res, async (err) => {
    if(err) {
      return next(MulterUploader.handleError(err));
    }
    try {
      const adsManager = new AdsManager(req, 'saving');
      const adPet = await adsManager.save();
      return res.json(adPet);
    } catch (err) {
      return next(err);
    }
  });
}

const deleteAd = (req, res, next) => {

}

module.exports = {
  getAds, 
  updateAd,
  saveAd,
  deleteAd
}