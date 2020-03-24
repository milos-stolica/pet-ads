import AxiosInstance from "./Axios";
//TODO this validator is duplicated, it should be shared between client and server
const email_regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phone_regex = /^(\+)*[0-9]+$/;
const only_letters_regex = /^[a-zA-Z ]+$/;
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

export default class Validator {
  static isEmailValid(email) {
    return email_regex.test(email);
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
      return number >= min && number <= max;
    }
    return false;
  }

  static typeValid(type, allowedTypes) {
    return !!allowedTypes.find(adType => adType === type);
  }

  static isImage(file) {
    console.log('file', file);
    return file && !!allowedImageTypes.find(type => type === file.type);
  }
}