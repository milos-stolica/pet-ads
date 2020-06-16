const mongoose = require('mongoose');
const { emailRgx, disallowSpecialCharsAndNumsRgx } = require('../enums_regex');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    match: disallowSpecialCharsAndNumsRgx,
    maxlength: 50
  },
  lastName: {
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
    unique: true,
    match: emailRgx
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
  },
  subscriptions: {
    type: Array
  }
}, {timestamps: true});

UserSchema.methods.addAd = function (ad) {
  this.ads.push(ad);
  this.save();
}

UserSchema.methods.addSubscription = function (subscription) {
  this.subscriptions.push(subscription);
  this.save();
}

UserSchema.methods.deleteAd = function (ad) {
  this.ads = this.ads.filter(adFromDb => adFromDb.toString() !== ad.toString());
  this.save();
}

UserSchema.methods.deleteSubscription = function (subscription) {
  this.subscriptions = this.subscriptions.filter(subscriptionFromDb => subscriptionFromDb.toString() !== subscription.toString());
  this.save();
}

UserSchema.index({ownerId: 1});

const User = mongoose.model('User', UserSchema);

module.exports = User;