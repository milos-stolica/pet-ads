const express = require('express');
const { getAds, updateAd, saveAd, deleteAd } = require('../../controllers/ads');
const router = express.Router();
const { fork } = require('child_process');

const imageUploader = fork('./server/child_processes/imageUploader.js');
imageUploader.on('error', (error) => {
  console.log(error);
  imageUploader = null;
});

router.route('/')
.get(getAds)
.put(updateAd(imageUploader))
.post(saveAd(imageUploader))
.delete(deleteAd)

module.exports = router;