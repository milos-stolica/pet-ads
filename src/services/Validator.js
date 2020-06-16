import Joi from '@hapi/joi';

const emailRgx = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const passwordRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const phoneRgx = /^(\+)*[0-9]+$/;
const disallowSpecialCharsAndNumsRgx = /^[^~,.<>;:"/[\]|{}()=_+)!?(0-9)]*$/;
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

export default class Validator {
  static getLoginFormErrors(fields) { 
    const loginScheme = Joi.object({
      email: Joi.string().pattern(emailRgx),
      password: Joi.string().pattern(passwordRgx)
    });
    const error = loginScheme.validate(fields, {abortEarly: false}).error;
    return error ? 
          { 
            wrongCredentials: 'Wrong credentials.' 
          } : {};
  }

  static getRegistrationFormErrors(fields) {
    const registrationScheme = Joi.object({
      email: Joi.string().pattern(emailRgx),
      password: Joi.string().pattern(passwordRgx),
      firstName: Joi.string().pattern(disallowSpecialCharsAndNumsRgx).max(50),
      lastName: Joi.string().pattern(disallowSpecialCharsAndNumsRgx).max(50)
    });
    
    const isImage = this.isImage(fields.file);
    delete fields.file;
    const error = registrationScheme.validate(fields, {abortEarly: false}).error;
    const errArray = error ? error.details.map(err => err.path[0]) : [];
    !isImage && errArray.push('file');
    return errArray.length ? 
          { 
            ...(errArray.includes('email') && { email: 'This is not valid email address.'}),
            ...(errArray.includes('password') && { password: 'Password is not strong enough.'}),
            ...(errArray.includes('firstName') && { firstName: 'This is not valid name. It should contain maximum 50 characters. Special characters and numbers are not allowed.'}),
            ...(errArray.includes('lastName') && { lastName: 'This is not valid lastname. It should contain maximum 50 characters. Special characters and numbers are not allowed.'}),
            ...(errArray.includes('file') && { file: 'Only images of png, jpeg or webp types are allowed.'})
          } : {};
  }

  static getManageAdFormErrors(fields, allowedAdTypes, allowedPetTypes) {
    const manageAdScheme = Joi.object({
      phone: Joi.string().pattern(phoneRgx).max(20),
      city: Joi.string().max(50).pattern(disallowSpecialCharsAndNumsRgx),
      state: Joi.string().max(50).pattern(disallowSpecialCharsAndNumsRgx),
      adType: Joi.string().valid(...allowedAdTypes),
      petType: Joi.string().valid(...allowedPetTypes),
      ...(fields.description && {description: Joi.string().min(0).max(1000)}),
      ...(fields.price && {price: Joi.number().min(0)})
    });

    let isImage;
    if(fields.file) {
      isImage = this.isImage(fields.file);
      delete fields.file;
    }
    const error = manageAdScheme.validate(fields, {abortEarly: false}).error;
    const errArray = error ? error.details.map(err => err.path[0]) : [];
    isImage !== undefined && !isImage && errArray.push('file');

    return errArray.length ? 
          { 
            ...(errArray.includes('phone') && { phone: 'This is not valid phone number. It can contains only numbers and + sign. Maixumum 20 characters.'}),
            ...(errArray.includes('price') && { price: 'Price must be positive number.'}),
            ...(errArray.includes('city') && { city: 'This is not valid city name. It should contain maximum 50 characters. Numbers and special characters are not allowed.'}),
            ...(errArray.includes('state') && { state: 'This is not valid state name. It should contain maximum 50 characters. Numbers and special characters are not allowed.'}),
            ...(errArray.includes('adType') && { adType: 'This is not valid ad type.'}),
            ...(errArray.includes('petType') && { petType: 'This is not valid pet type.'}),
            ...(errArray.includes('description') && { description: 'Description can contains up to 1000 characters.'}),
            ...(errArray.includes('file') && { file: 'Only images of png, jpeg or webp types are allowed.'})
          } : {};
  }

  static getManageSubscriptionFormErrors(fields, allowedAdTypes, allowedPetTypes) {
    const manageSubscriptionScheme = Joi.object({
      city: Joi.string().max(50).pattern(disallowSpecialCharsAndNumsRgx),
      state: Joi.string().max(50).pattern(disallowSpecialCharsAndNumsRgx),
      adType: Joi.string().valid(...allowedAdTypes),
      petType: Joi.string().valid(...allowedPetTypes)
    });

    const error = manageSubscriptionScheme.validate(fields, {abortEarly: false}).error;
    const errArray = error ? error.details.map(err => err.path[0]) : [];

    return errArray.length ? 
          { 
            ...(errArray.includes('city') && { city: 'This is not valid city name. It should contain maximum 50 characters. Numbers and special characters are not allowed.'}),
            ...(errArray.includes('state') && { state: 'This is not valid state name. It should contain maximum 50 characters. Numbers and special characters are not allowed.'}),
            ...(errArray.includes('adType') && { adType: 'This is not valid ad type.'}),
            ...(errArray.includes('petType') && { petType: 'This is not valid pet type.'})
          } : {};
  }

  static isImage(file) {
    return file && !!allowedImageTypes.find(type => type === file.type);
  }
}