const mongoose = require('mongoose');
const { petTypes, adTypes, phoneRgx, emailRgx, disallowSpecialCharsAndNumsRgx } = require('../enums_regex');

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
    enum: petTypes
  },
  ad_type: {
    type: String,
    trim: true,
    required: true,
    enum: adTypes
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
  phone: {
    type: String,
    trim: true,
    required: true,
    match: phoneRgx,
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