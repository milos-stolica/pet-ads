(function({phone_regex, email_regex, password_regex, only_letters_regex, ad_types, pet_types}) {
  module.exports = class Validator {
    static isEmailValid(email) {
      return email_regex.test(email);
    }

    static isPasswordValid(password) {
      return password_regex.test(password);
    }

    static isPhoneValid(phone) {
      return phone_regex.test(phone);
    }

    static onlyLetters(string) {
      return only_letters_regex.test(string);
    }

    static lengthInRange(string, minLength = 0, maxLength = 1000) {
      return string.length >= minLength && string.length <= maxLength
    }

    static valueInRange(number, min = 0, max = Number.MAX_SAFE_INTEGER) {
      if(!isNaN(parseFloat(number))) {
        return number => min && number <= max;
      }
      return false;
    }

    static adTypeValid(type) {
      return !!ad_types.find(adType => adType === type);
    }

    static petTypeValid(type) {
      return !!pet_types.find(petType => petType === type);
    }
  }
})
(require('../enums_regex'));