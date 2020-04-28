const express = require('express');
const { getAds, updateAd, saveAd, sendAd, deleteAd } = require('../../controllers/ads');
const router = express.Router();
const { checkAuthentificated } = require('../../controllers/auth');
const { updateUserAds } = require('../../controllers/user');

router.route('/')
.get(getAds)
.put(checkAuthentificated, updateAd)
.post(checkAuthentificated, saveAd, updateUserAds, sendAd)
.delete(checkAuthentificated, deleteAd)

module.exports = router;