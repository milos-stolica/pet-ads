const AdsManager = require('../../services/AdsManager');

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

const updateAd = async (req, res, next) => {
  try {
    const adsManager = new AdsManager(req, 'updating');
    const ad = await adsManager.update();
    res.json(ad);
  } catch (err) {
    next(err);
  }
}

const saveAd = async (req, res, next) => {
  try {
    const adsManager = new AdsManager(req, 'saving');
    const savedAd = await adsManager.save();
    res.locals.adPet = savedAd;
    return next();
  } catch (err) {
    return next(err);
  }
}

const sendAd = (req, res, next) => {
  const {adPet} = res.locals;
  return res.json(adPet);
}

const deleteAd = async (req, res, next) => {
  try {
    const adsManager = new AdsManager(req, 'deleting');
    const deletedAd = await adsManager.delete();
    res.locals.adPet = deletedAd;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAds, 
  updateAd,
  saveAd,
  deleteAd,
  sendAd
}