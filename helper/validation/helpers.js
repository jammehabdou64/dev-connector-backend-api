const validator = require("validator");
const { capitalize, getModel } = require("../../utils");

exports.required = (fieldName, fieldVal) => {
  return validator.default.isEmpty(fieldVal)
    ? `${capitalize(fieldName)} is required`
    : false;
};

exports.min = (fieldName, fieldVal, minVal) => {
  return !validator.default.isLength(fieldVal, { min: minVal })
    ? `${capitalize(fieldName)} should be minimum of ${minVal} ${
        minVal <= 1 ? "character" : "characters"
      }`
    : false;
};

exports.max = (fieldName, fieldVal, maxVal) => {
  return !validator.default.isLength(fieldVal, { max: maxVal })
    ? `${capitalize(fieldName)} should be maximum of ${maxVal} ${
        maxVal <= 1 ? "character" : "characters"
      }`
    : false;
};

exports.email = (fieldVal) => {
  return !validator.default.isEmail(fieldVal) ? `Email is invalid` : false;
};

exports.bool = (fieldName, fieldVal) => {
  return !validator.default.isBoolean(fieldVal)
    ? `${capitalize(fieldName)} should be a boolean`
    : false;
};

exports.float = (fieldName, fieldVal) => {
  return !validator.default.default.isFloat(fieldVal)
    ? `${capitalize(fieldName)} should be a float`
    : false;
};

exports.num = (fieldName, fieldVal) => {
  return !validator.default.isNumeric(fieldVal)
    ? `${capitalize(fieldName)} should only be a number`
    : false;
};

exports.alpha = (fieldName, fieldVal) => {
  return !validator.default.isAlpha(fieldVal)
    ? `${capitalize(fieldName)} should only contain letters`
    : false;
};

exports.alphaNum = (fieldName, fieldVal) => {
  return !validator.default.isAlphanumeric(fieldVal)
    ? `${capitalize(fieldName)} should only contain letters and numbers`
    : false;
};

exports.same = (fieldNames = [], fieldValues = []) => {
  let [fieldOneName, fieldTwoName] = fieldNames;
  let [fieldOneVal, fieldTwoVal] = fieldValues;
  return validator.default.equals(fieldOneVal, fieldTwoVal)
    ? false
    : `${capitalize(fieldOneName)} did not match with ${capitalize(
        fieldTwoName
      )}`;
};

exports.creditCard = (fieldName, fieldVal) => {
  return !validator.default.isCreditCard(fieldVal)
    ? `${capitalize(fieldName)} invalid credit card`
    : false;
};

exports.url = (fieldName, fieldVal) => {
  return !validator.default.isURL(fieldVal)
    ? `${capitalize(fieldName)} invalid url`
    : false;
};

exports.decimal = (fieldName, fieldVal) => {
  return !validator.default.isDecimal(fieldVal)
    ? `${capitalize(fieldName)} should be a decimal number`
    : false;
};

exports.int = (fieldName, fieldVal) => {
  return !validator.default.isInt(fieldVal)
    ? `${capitalize(fieldName)} should be an integer`
    : false;
};

exports.json = (field) => {
  return !validator.default.isJSON(field)
    ? `${field[0].toUpperCase() + field.slice(1)} invalid json`
    : false;
};

exports.unique = async (fieldName, fieldVal, model) => {
  try {
    let modelName = getModel(`${capitalize(model)}`);
    return (await modelName.findOne({ [fieldName]: fieldVal }))
      ? `${capitalize(fieldName)} already exist`
      : false;
  } catch (e) {
    console.log("db error", e.message);
  }
};

exports.jwt = (fieldName, fieldVal) => {
  return validator.default.isJWT(fieldVal)
    ? `${capitalize(fieldName)} invalid jwt`
    : false;
};

exports.postal = (fieldName, fieldVal) => {
  return !validator.default.isPostalCode(fieldVal)
    ? `${capitalize(fieldName)} invalid postal code`
    : false;
};

exports.nullable = () => {
  return false;
};

exports.phone = (fieldName, fieldVal) => {
  return !validator.default.isMobilePhone(fieldVal)
    ? `${capitalize(fieldName)} invalid phone number`
    : false;
};

exports.slug = (fieldName, fieldVal) => {
  return !validator.default.isSlug(fieldVal)
    ? `${capitalize(fieldName)} invalid slug`
    : false;
};

exports.next = () => {
  return false;
};

exports.mongoId = (fieldVal) => {
  return !validator.default.isMongoId(fieldVal) ? `invalid mongodb id` : false;
};
//for spliting validation like min: eq:
exports.vSplit = (data, index) => data.split(":")[index].replace(/\s/g, "");

//if data includes validation rules
exports.checkRules = (data) => {
  return (
    data.includes("min:") || data.includes("max:") || data.includes("unique:")
  );
};

exports.request = (req, data) => {
  return req.body[data] ? req.body[data] : "";
};
