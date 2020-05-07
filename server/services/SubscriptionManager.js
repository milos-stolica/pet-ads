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

    let valid = Validator.adTypeValid(this.req.body.ad_type) && Validator.hasNotNumberOrSpecialCh(this.req.body.city) && 
    Validator.hasNotNumberOrSpecialCh(this.req.body.state) && Validator.isEmailValid(this.req.body.email) && 
    Validator.petTypeValid(this.req.body.type) && Validator.lengthInRange(this.req.body.city, 0, 50) && Validator.lengthInRange(this.req.body.state, 0, 50);

    return valid;
  }

  getSubscriptionsForUser() {
    return SubscriptionModel.find({ownerId: this.req.params.userId});
  }

  async update() {
    if(this.valid) {
      try {
        const subscription = this.constructSubscription();
        const updatedSubscription = await SubscriptionModel.findOneAndUpdate({ _id: this.req.body.id }, subscription, { new: true });
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

  //TODO make this inaccessable out of this class
  constructSubscription() {
    const subscription = {
      petType: this.req.body.type,
      city: this.req.body.city,
      state: this.req.body.state,
      adType: this.req.body.ad_type,
      email: this.req.user.email,
      ownerId: this.req.user._id
    }

    return subscription;
  }
}