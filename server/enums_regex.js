(function() {
  const pet_types = ['Dog', 'Cat', 'Rabbit', 'Fish', 'Parrot', 'Hamster'];
  const ad_types = ['For sale', 'Look for', 'Found', 'Lost', 'Seen'];
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  const mongodbObjectId = /^[0-9a-fA-F]{24}$/;
  const email_regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const phone_regex = /^(\+)*[0-9]+$/;
  const all_expect_num_and_spec_ch = /^[^`~,.<>;':"/[\]|{}()=_+\-)!?(0-9)]*$/;

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
    all_expect_num_and_spec_ch,
    allowedImageTypes,
    maxImageLength,
    maxNumberOfFormParts, 
    saltRounds
  }

})();