const UserManagement = require('../../services/UserManagement');

async function updateUserAds(req, res, next) {
  try {
    const user = await UserManagement.tryGetUserData(req, false);
    const {adPet} = res.locals;
    await user.addAd(adPet._id);
    next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  updateUserAds
}