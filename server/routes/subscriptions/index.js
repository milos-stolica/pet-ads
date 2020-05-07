const express = require('express');
const { getSubscriptionsForUser, updateSubscription, saveSubscription, sendSubscription, deleteSubscription } = require('../../controllers/subscriptions');
const router = express.Router();
const { checkAuthentificated } = require('../../controllers/auth');
const { updateUserSubscriptions } = require('../../controllers/user');

router.route('/')
.put(checkAuthentificated, updateSubscription)
.post(checkAuthentificated, saveSubscription, updateUserSubscriptions, sendSubscription)
.delete(checkAuthentificated, deleteSubscription);

router.get('/:userId', getSubscriptionsForUser);

module.exports = router;