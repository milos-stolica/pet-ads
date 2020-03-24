(function(multer, constants, createError) {
  module.exports = class MulterUploader {
    static upload(fieldName) {
      return multer({
        fileFilter: function(req, file, cb) {
          if(!file) {
            return cb(new Error('Uploaded file is null'), false);
          }
          if(constants.allowedImageTypes.find(type => type === file.mimetype) != undefined) {
            return cb(null, true);
          }
          return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE','Trying to upload file that is not image'), false);
        },
        limits: {
          fileSize: constants.maxImageLength,
          parts: constants.maxNumberOfFormParts
        }
      }).single(fieldName);
    }

    static handleError(err) {
      if (err instanceof multer.MulterError) {
        switch(err.code) {
          case 'LIMIT_UNEXPECTED_FILE':
            return createError(400, 'Validation failed. Unexpected mime type of file.');
          case 'LIMIT_FILE_SIZE':
            return createError(400, `Validation failed. Image file to large. Allowed up to ${constants.maxImageLength} bytes.`);
          case 'LIMIT_PART_COUNT':
            return createError(400, `Validation failed. Max number of form fields exceded. Allowed up to ${constants.maxNumberOfFormParts} form fields.`);
          default:
            return createError(400, `Validation failed. Multer returns error while uploading.`);
        }
      } else if (err) {
        return createError(500, 'Unknown error while uploading using multer');
      }
      return null;
    }

  }
})
(require('multer'), require('../enums_regex'), require('http-errors'))