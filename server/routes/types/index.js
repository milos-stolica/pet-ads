const express = require('express');
const router = express.Router();
const enums = require('../../enums_regex')

router.get('/pets', (req, res) => {
  res.json(enums.pet_types);
});

router.get('/ads', (req, res) => {
  res.json(enums.ad_types);
});

module.exports = router;