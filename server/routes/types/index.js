const express = require('express');
const router = express.Router();
const enums = require('../../enums_regex')

router.get('/pets', (req, res) => {
  res.json(enums.petTypes);
});

router.get('/ads', (req, res) => {
  res.json(enums.adTypes);
});

module.exports = router;