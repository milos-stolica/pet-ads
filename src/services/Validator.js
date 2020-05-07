//TODO this validator is duplicated, it should be shared between client and server
const email_regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const phone_regex = /^(\+)*[0-9]+$/;
const all_expect_num_and_spec_ch = /^[^`~,.<>;':"/[\]|{}()=_+\-)!?(0-9)]*$/;
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

export default class Validator {
  static isEmailValid(email) {
    return email_regex.test(email);
  }

  static isPasswordValid(password) {
    return password_regex.test(password);
  }

  static isPhoneValid(phone) {
    return phone_regex.test(phone);
  }

  static hasNotNumberOrSpecialCh(string) {
    return all_expect_num_and_spec_ch.test(string);
  }

  static lengthInRange(string, minLength = 0, maxLength = 1000) {
    return string.length >= minLength && string.length <= maxLength
  }

  static valueInRange(number, min = 0, max = Number.MAX_SAFE_INTEGER) {
    if(!isNaN(parseFloat(number))) {
      return number >= min && number <= max;
    }
    return false;
  }

  static typeValid(type, allowedTypes) {
    return !!allowedTypes.find(adType => adType === type);
  }

  static isImage(file) {
    return file && !!allowedImageTypes.find(type => type === file.type);
  }
}