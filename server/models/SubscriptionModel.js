const mongoose = require('mongoose');
const { petTypes, adTypes, emailRgx, disallowSpecialCharsAndNumsRgx } = require('../enums_regex');

const SubscriptionSchema = new mongoose.Schema({
  petType: {
    type: String,
    trim: true,
    required: true,
    enum: petTypes
  },
  adType: {
    type: String,
    trim: true,
    required: true,
    enum: adTypes
  },
  city: {
    type: String,
    trim: true,
    required: true,
    match: disallowSpecialCharsAndNumsRgx,
    maxlength: 50
  },
  state: {
    type: String,
    trim: true,
    required: true,
    match: disallowSpecialCharsAndNumsRgx,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    required: true,
    match: emailRgx,
  },
  ownerId: {
    type: String,
    trim: true,
    required: true
  }
}, {timestamps: true});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;