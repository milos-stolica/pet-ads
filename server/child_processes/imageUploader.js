const sharp = require('sharp');
process.on('message', ({image, path}) => {
  const imageBuffer = Buffer.from(image);
  const pathname = path;
  sharp(imageBuffer, {})
  .resize(400, 400)
  .png()
  .toFile(pathname, (err, info) => {
    if(err) {
      process.send({success: false, error: err});
    } else {
      process.send({success: true, info})
    }
  });
});
