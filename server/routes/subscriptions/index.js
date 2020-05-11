const express = require('express');
const { getSubscriptionsForUser, updateSubscription, saveSubscription, sendSubscription, deleteSubscription } = require('../../controllers/subscriptions');
const router = express.Router();
const { checkAuthentificated, checkUserPermissions } = require('../../controllers/auth');
const { updateUserSubscriptions } = require('../../controllers/user');

router.param('id', (req, res, next, id) => {
  req.resourceId = id;
  return next();
});

router.route('/')
.get(checkAuthentificated, getSubscriptionsForUser)
.put(checkAuthentificated, checkUserPermissions('subscriptionManipulation'), updateSubscription)
.post(checkAuthentificated, saveSubscription, updateUserSubscriptions, sendSubscription)
router.delete('/:id', checkAuthentificated, checkUserPermissions('subscriptionManipulation'), deleteSubscription);

module.exports = router;