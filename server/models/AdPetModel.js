const mongoose = require('mongoose');
const { pet_types, ad_types, phone_regex, email_regex, all_expect_num_and_spec_ch } = require('../enums_regex');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const AdPetSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
    enum: pet_types
  },
  ad_type: {
    type: String,
    trim: true,
    required: true,
    enum: ad_types
  },
  image_name: {
    type: String,
    trim: true,
    required: true
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
  phone: {
    type: String,
    trim: true,
    required: true,
    match: phone_regex,
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
  },
  price: {
    type: Number,
    trim: true,
    min: 0
  }
}, {timestamps: true});

AdPetSchema.index({ image_name: 1}, { unique: true });
AdPetSchema.index({updatedAt: 1});

const AdPet = mongoose.model('AdPet', AdPetSchema);

module.exports = AdPet;