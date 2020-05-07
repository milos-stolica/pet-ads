const mongoose = require('mongoose');
const { pet_types, ad_types, email_regex, all_expect_num_and_spec_ch } = require('../enums_regex');

const SubscriptionSchema = new mongoose.Schema({
  petType: {
    type: String,
    trim: true,
    required: true,
    enum: pet_types
  },
  adType: {
    type: String,
    trim: true,
    required: true,
    enum: ad_types
  },
  city: {
    type: String,
    trim: true,
    required: true,
    match: all_expect_num_and_spec_ch,
    maxlength: 50
  },
  state: {
    type: String,
    trim: true,
    required: true,
    match: all_expect_num_and_spec_ch,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    required: true,
    match: email_regex,
  },
  ownerId: {
    type: String,
    trim: true,
    required: true
  }
}, {timestamps: true});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;