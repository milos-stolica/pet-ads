const fs = require('fs');
const { ad_types } = require('./enums_regex');
const path = require('path');

const makeDirectories = () => {
  const names = ad_types;

  names.forEach(ad_type => {
    const _path = path.join(__dirname, 'public', 'ads_images', ad_type);
    fs.existsSync(_path) || fs.mkdirSync(_path)
  });
}

const _path = path.join(__dirname, 'public', 'users_images');
fs.existsSync(_path) || fs.mkdirSync(_path)

module.exports = {
  makeDirectories
}