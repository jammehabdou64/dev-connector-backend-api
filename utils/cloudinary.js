const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryUpload = (path) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, (err, result) => {
      if (result) {
        return resolve(result);
      }

      if (err) {
        return reject(err);
      }
    });
  });

module.exports = cloudinaryUpload;
