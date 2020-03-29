const mongoose = require('mongoose');
const { email_regex, only_letters_regex } = require('../enums_regex');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    match: only_letters_regex,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    match: only_letters_regex,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: email_regex
  },
  password: {
    type: String,
    required: true
  },
  image_name: {
    type: String,
    trim: true,
    required: true
  },
  ads: {
    type: Array
  }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;