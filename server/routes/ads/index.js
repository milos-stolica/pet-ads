const express = require('express');
const { getAds, updateAd, saveAd, deleteAd } = require('../../controllers/ads');
const router = express.Router();

router.route('/')
.get(getAds)
.put(updateAd)
.post(saveAd)
.delete(deleteAd)

module.exports = router;