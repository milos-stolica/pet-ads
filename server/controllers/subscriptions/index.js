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
    res.locals.subscription = savedSubscription;
    return next();
  } catch (err) {
    return next(err);
  }
}

const deleteSubscription = async (req, res, next) => {
  try {
    const subscriptionManager = new SubscriptionManager(req);
    const deletedSubscription = await subscriptionManager.delete();
    res.locals.subscription = deletedSubscription;
    return next();
  } catch (err) {
    return next(err);
  }
}

const sendSubscription = (req, res, next) => {
  const { subscription } = res.locals;
  return res.json(subscription);
}

module.exports = {
  getSubscriptionsForUser, 
  updateSubscription,
  saveSubscription,
  deleteSubscription,
  sendSubscription
}