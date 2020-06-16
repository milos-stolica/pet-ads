const SubscriptionModel = require('../models/SubscriptionModel');
const Validator = require('../validators');
const createError = require('http-errors');

module.exports = class SubscriptionManager {
  constructor(req) {
    this.req = req;
    this.valid = this.validate();
  }

  validate() {
    if(!this.req.body) {
      return false;
    }

    return Validator.isSubscriptionFormValid({
      city: this.req.body.city,
      state: this.req.body.state,
      adType: this.req.body.adType,
      petType: this.req.body.petType,
    });
  }

  getSubscriptionsForUser() {
    return SubscriptionModel.find({ownerId: this.req.user._id}).sort({updatedAt: -1});
  }

  async update() {
    if(this.valid) {
      try {
        const subscription = this.constructSubscription();
        const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(this.req.body.id, subscription, { new: true });
        return Promise.resolve(updatedSubscription);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(createError(400, 'Validation failed'));
    }
  }

  async save() {
    if(this.valid) {
      try {
        const subscription = this.constructSubscription();
        const subscriptionDoc = new SubscriptionModel(subscription);
        const savedSubscription = await subscriptionDoc.save();
        return Promise.resolve(savedSubscription);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(createError(400, 'Validation failed'));
    }
  }
  
  async delete() {
    if(!this.req.params.id) return Promise.reject(createError(400, 'Bad request'));
    try {
      const deleted = await SubscriptionModel.findByIdAndDelete(this.req.params.id);
      return Promise.resolve(deleted);
    } catch (err) {
      Promise.reject(err);
    }  
  }

  //TODO make this inaccessable out of this class
  constructSubscription() {
    const subscription = {
      petType: this.req.body.petType,
      city: this.req.body.city,
      state: this.req.body.state,
      adType: this.req.body.adType,
      email: this.req.user.email,
      ownerId: this.req.user._id
    }

    return subscription;
  }
}