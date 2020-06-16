const fs = require('fs');
const { adTypes } = require('./enums_regex');
const path = require('path');

const publicDirPath = path.join(__dirname, 'public');
fs.existsSync(publicDirPath) || fs.mkdirSync(publicDirPath);

const adsImagesDirPath = path.join(__dirname, 'public', 'ads_images');
fs.existsSync(adsImagesDirPath) || fs.mkdirSync(adsImagesDirPath);

const makeDirectories = () => {
  const names = adTypes;
  names.forEach(adType => {
    const _path = path.join(__dirname, 'public', 'ads_images', adType);
    fs.existsSync(_path) || fs.mkdirSync(_path)
  });
}

const _path = path.join(__dirname, 'public', 'users_images');
fs.existsSync(_path) || fs.mkdirSync(_path)

module.exports = {
  makeDirectories
}