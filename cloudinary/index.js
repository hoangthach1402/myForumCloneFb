const crypto = require('crypto');
const cloudinary = require('cloudinary');

const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: 'cugia94',
    api_key: '739418546377723',
    api_secret: 'xpFYjUwAuMlYi02ZxqnHgp7DmP4'
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'gaito',
  allowedFormats: ['jpeg', 'jpg', 'png'],
  filename: function (req, file, cb) {
    let buf = crypto.randomBytes(16);
    buf = buf.toString('hex');
    let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
    uniqFileName += buf;
    cb(undefined, uniqFileName );
  }
});
module.exports ={cloudinary,storage}
