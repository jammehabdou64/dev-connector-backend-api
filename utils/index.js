const bcryptjs = require("bcryptjs");
const getRootPath = require("app-root-path").path;
const path = require("path");
const jwt = require("jsonwebtoken");
const { throwException } = require("../errorHandler/throwException");
const cloudinary = require("./cloudinary");

//
exports.bcrypt = async (data) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hash(data, salt);
};

exports.verifyHash = async (data, hash) => {
  return bcryptjs.compare(data, hash);
};

exports.jwtSign = (data) => jwt.sign(data, process.env.JWT_SECRET);

exports.jwtVerify = (token) => jwt.verify(token, process.env.JWT_SECRET);

exports.saveImage = (req, fieldName, filePath = "image") => {
  let file = req.files[fieldName];
  const name = file?.name?.split(".")[0];
  const randomNum = Math.floor(Math.random() * 1000);
  const extension = path
    .extname(req.files[fieldName]?.name)
    .toLocaleLowerCase();
  const fileName = `${name}-${randomNum + extension}`.replace(/\s/g, "-");
  file.mv(
    // `${require("app-root-path").path}/public/${filePath}/${fileName}`,
    cloudinary.uploader.upload(fileName, (err, result) => {
      if (err) return false;
      if (result) return true;
    }),
    (err) => {
      if (err) {
        return false;
      }
    }
  );
  return fileName;
};

exports.capitalize = (str) => {
  return `${str[0].toUpperCase() + str.slice(1)}`;
};

exports.getModel = (model) => require(`${getRootPath}/app/model/${model}`);

exports.asyncHandler = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);

exports.findUserByCompany = async (req) => {
  try {
    if (req.id) {
      const user = await this.getModel("User").findById(req.id);
      if (!user) {
        return throwException({ message: "unauthorise" });
      }
      const company = await this.getModel("Company")
        .find()
        .where("user", user._id.toString());
      return company.length > 0 ? company[0] : {};
    }
    return throwException({ message: "unauthorise" });
  } catch (error) {
    console.log(error.message);
  }
};
