const fs = require('fs');
const { ad_types } = require('./enums_regex');
const path = require('path');

const publicDirPath = path.join(__dirname, 'public');
fs.existsSync(publicDirPath) || fs.mkdirSync(publicDirPath);

const adsImagesDirPath = path.join(__dirname, 'public', 'ads_images');
fs.existsSync(adsImagesDirPath) || fs.mkdirSync(adsImagesDirPath);

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