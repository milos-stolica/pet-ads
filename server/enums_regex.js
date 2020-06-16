(function() {
  const petTypes = ['Dog', 'Cat', 'Rabbit', 'Fish', 'Parrot', 'Hamster'];
  const adTypes = ['For sale', 'Look for', 'Found', 'Lost', 'Seen'];
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  const mongodbObjectId = /^[0-9a-fA-F]{24}$/;
  const emailRgx = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const passwordRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const phoneRgx = /^(\+)*[0-9]+$/;
  const disallowSpecialCharsAndNumsRgx = /^[^~,.<>;:"/[\]|{}()=_+)!?(0-9)]*$/;

  const maxImageLength = 8 * 1024 * 1024;
  const maxNumberOfFormParts = 20;
  const saltRounds = 12;

  module.exports = {
    petTypes,
    adTypes,
    mongodbObjectId,
    emailRgx,
    passwordRgx,
    phoneRgx,
    allowedImageTypes,
    maxImageLength,
    maxNumberOfFormParts, 
    disallowSpecialCharsAndNumsRgx,
    saltRounds
  }

})();