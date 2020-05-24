const express = require('express');
const { getAds, updateAd, saveAd, sendAd, deleteAd } = require('../../controllers/ads');
const router = express.Router();
const { checkAuthentificated, checkUserPermissions } = require('../../controllers/auth');
const { updateUserAds } = require('../../controllers/user');

router.param('id', (req, res, next, id) => {
  req.resourceId = id;
  return next();
});

router.route('/')
.put(
  checkAuthentificated, 
  checkUserPermissions('adManipulation'), 
  updateAd)
.post(
  checkAuthentificated, 
  saveAd, updateUserAds('addAd'), 
  sendAd);
router.delete('/:id', 
  checkAuthentificated, 
  checkUserPermissions('adManipulation'), 
  deleteAd, 
  updateUserAds('deleteAd'), 
  sendAd);
router.get('/all', getAds)

module.exports = router;