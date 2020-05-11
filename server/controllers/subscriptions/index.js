const SubscriptionManager = require('../../services/SubscriptionManager');

const getSubscriptionsForUser = async(req, res, next) => {
  const subscriptionManager = new SubscriptionManager(req);
  try {
    const subscritpions = await subscriptionManager.getSubscriptionsForUser();
    return res.json(subscritpions);
  } catch (err) {
    return next(err);
  }
}

const updateSubscription = async (req, res, next) => {
  try {
    const subscriptionManager = new SubscriptionManager(req);
    const updatedSubscription = await subscriptionManager.update();
    res.json(updatedSubscription);
  } catch (err) {
    next(err);
  }
}

const saveSubscription = async (req, res, next) => {
  try {
    const subscritpionManager = new SubscriptionManager(req);
    const savedSubscription = await subscritpionManager.save();
    res.locals.savedSubscription = savedSubscription;
    return next();
  } catch (err) {
    return next(err);
  }
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