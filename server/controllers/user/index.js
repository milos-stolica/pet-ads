const UserManagement = require('../../services/UserManagement');

function updateUserAds(operation) {
  return async (req, res, next) => {
    try {
      const user = await UserManagement.tryGetUserData(req, false);
      const { adPet } = res.locals;
      await user[operation](adPet._id);
      next();
    } catch (err) {
      return next(err);
    }
  }
}

function updateUserSubscriptions(operation) {
  return async (req, res, next) => {
    try {
      const user = await UserManagement.tryGetUserData(req, false);
      const { subscription } = res.locals;
      await user[operation](subscription._id);
      next();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = {
  updateUserAds,
  updateUserSubscriptions
}
