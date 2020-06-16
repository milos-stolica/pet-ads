(function({phoneRgx, emailRgx, passwordRgx, disallowSpecialCharsAndNumsRgx, adTypes, petTypes}, Joi) {
  module.exports = class Validator {

    static isAdFormValid(fields) {
      const manageAdScheme = Joi.object({
        phone: Joi.string().pattern(phoneRgx).max(20),
        city: Joi.string().max(50).pattern(disallowSpecialCharsAndNumsRgx),
        state: Joi.string().max(50).pattern(disallowSpecialCharsAndNumsRgx),
        adType: Joi.string().valid(...adTypes),
        petType: Joi.string().valid(...petTypes),
        ...(fields.description && {description: Joi.string().min(0).max(1000)}),
        ...(fields.price && {price: Joi.number().min(0)})
      });
  
      return !manageAdScheme.validate(fields, {abortEarly: false}).error;
    }

    static isSubscriptionFormValid(fields) {
      const manageSubscriptionScheme = Joi.object({
        city: Joi.string().max(50).pattern(disallowSpecialCharsAndNumsRgx),
        state: Joi.string().max(50).pattern(disallowSpecialCharsAndNumsRgx),
        adType: Joi.string().valid(...adTypes),
        petType: Joi.string().valid(...petTypes)
      });
  
      return !manageSubscriptionScheme.validate(fields, {abortEarly: false}).error;
    }

    static isRegistrationFormValid(fields) {
      const registrationScheme = Joi.object({
        email: Joi.string().pattern(emailRgx),
        password: Joi.string().pattern(passwordRgx),
        firstName: Joi.string().pattern(disallowSpecialCharsAndNumsRgx).max(50),
        lastName: Joi.string().pattern(disallowSpecialCharsAndNumsRgx).max(50)
      });
  
      return !registrationScheme.validate(fields, {abortEarly: false}).error;
    }

    static isLoginFormValid(fields) {
      const loginScheme = Joi.object({
        email: Joi.string().pattern(emailRgx),
        password: Joi.string().pattern(passwordRgx)
      });

      return !loginScheme.validate(fields, {abortEarly: false}).error;
    }
  }
})
(require('../enums_regex'), require('@hapi/joi'));