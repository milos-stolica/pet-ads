const MulterUploader = require('../../services/MulterUploader');
const SubscriptionManager = require('../../services/SubscriptionManager');

const upload = MulterUploader.upload('file');

const getSubscriptionsForUser = async(req, res, next) => {
  const subscriptionManager = new SubscriptionManager(req);
  try {
    const subscritpions = await subscriptionManager.getSubscriptionsForUser();
    return res.json(subscritpions);
  } catch (err) {
    return next(err);
  }
}

const updateSubscription = (req, res, next) => {
  upload(req, res, async(err) => {
    if(err) {
      return next(MulterUploader.handleError(err));
    }
    try {
      const subscriptionManager = new SubscriptionManager(req);
      const updatedSubscription = await subscriptionManager.update();
      res.json(updatedSubscription);
    } catch (err) {
      next(err);
    }
  });
}

const saveSubscription = (req, res, next) => {
  upload(req, res, async (err) => {
    if(err) {
      return next(MulterUploader.handleError(err));
    }
    try {
      const subscritpionManager = new SubscriptionManager(req);
      const savedSubscription = await subscritpionManager.save();
      res.locals.savedSubscription = savedSubscription;
      return next();
    } catch (err) {
      return next(err);
    }
  });
}

const sendSubscription = (req, res, next) => {
  const {savedSubscription} = res.locals;
  return res.json(savedSubscription);
}

const deleteSubscription = (req, res, next) => {

}

module.exports = {
  getSubscriptionsForUser, 
  updateSubscription,
  saveSubscription,
  deleteSubscription,
  sendSubscription
}