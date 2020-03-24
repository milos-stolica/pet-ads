const path = require('path');
const sharp = require('sharp');
const { uuid } = require('uuidv4');
const fs = require('fs');
const util = require('util');

class ImageController {
  constructor(imageBuffer, destinationFolder, imageUploader) {
    this.imageBuffer = imageBuffer;
    this.destinationFolder = destinationFolder;
    this.imgName = uuid() + '.png';
    this.imageUploader = imageUploader;
  }

  saveImage() {
    //this is much slower than variant below, but this is some example how to use fork (it should be used for 
    //long term sync computation because of blocking event loop)
    /* return new Promise((resolve, reject) => {
      if(this.imageUploader) {
        const imgPath = path.join(__dirname, '../', 'public', 'ads_images', this.destinationFolder, this.imgName);
        this.imageUploader.send({image: this.imageBuffer, path: imgPath});
        this.imageUploader.on('message', (data) => {
          if(data.success === true) {
            resolve(data.info);
          } else {
            reject(data.error);
          }
        });
      } else {
        reject(new Error('Image upload process is killed.'));
      }
      
    }); */
    
    return new Promise((resolve, reject) => {
      const imgPath = path.join(__dirname, '../', 'public', 'ads_images', this.destinationFolder, this.imgName);
      sharp(this.imageBuffer, {})
        .resize(400, 400)
        .png()
        .toFile(imgPath, (err, info) => {
          if(err) {
            reject(err);
          }
          resolve(info);
        });
    });
  }

  getImgName() {
    return this.imgName;
  }

  static async deleteImage(path) {
    try {
      const deleteFile = util.promisify(fs.unlink);
      await deleteFile(path);
    } catch (err) {
      console.log(err);
    }
  }

  static async moveImage(oldPath, newPath) {
    try {
      const moveFile = util.promisify(fs.rename);
      await moveFile(oldPath, newPath);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ImageController;