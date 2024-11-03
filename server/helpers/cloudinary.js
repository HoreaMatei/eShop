const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "du2u61p2o",
  api_key: "156834834154542",
  api_secret: "VjA-sMBJ9QArjZ9SdqDYg7eDPww",
});

const storage = new multer.memoryStorage();

async function ImageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({
  storage,
});

module.exports = { upload, ImageUploadUtils };
