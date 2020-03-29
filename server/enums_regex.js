(function() {
  const pet_types = ['Dog', 'Cat', 'Rabbit', 'Fish', 'Snake', 'Hamster'];
  const ad_types = ['Sell', 'Buy', 'Found', 'Lost', 'Seen'];
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  const mongodbObjectId = /^[0-9a-fA-F]{24}$/;
  const email_regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const phone_regex = /^(\+)*[0-9]+$/;
  const only_letters_regex = /^[a-zA-Z ]+$/;

  const maxImageLength = 8 * 1024 * 1024;
  const maxNumberOfFormParts = 20;
  const saltRounds = 12;

  module.exports = {
    pet_types,
    ad_types,
    mongodbObjectId,
    email_regex,
    password_regex,
    phone_regex,
    only_letters_regex,
    allowedImageTypes,
    maxImageLength,
    maxNumberOfFormParts, 
    saltRounds
  }

})();