const path = require('path');
const sharp = require('sharp');
const { uuid } = require('uuidv4');
const fs = require('fs');
const util = require('util');

const deleteFile = util.promisify(fs.unlink);
const moveFile = util.promisify(fs.rename);

class ImageController {
  constructor(imageBuffer, destinationFolder) {
    this.imageBuffer = imageBuffer;
    this.destinationFolder = destinationFolder;
    this.imgName = uuid() + '.png';
    this.imgPath = path.join(this.destinationFolder, this.imgName);
  }

  saveImage() {
    return new Promise((resolve, reject) => {
      sharp(this.imageBuffer, {})
        .resize(400, 400)
        .png()
        .toFile(this.imgPath, (err, info) => {
          if(err) reject(err);
          resolve(info);
        });
    });
  }

  getImgName() {
    return this.imgName;
  }

  static async deleteImage(path) {
    try {
      await deleteFile(path);
    } catch (err) {
      throw err;
    }
  }

  static async moveImage(oldPath, newPath) {
    try {
      await moveFile(oldPath, newPath);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ImageController;