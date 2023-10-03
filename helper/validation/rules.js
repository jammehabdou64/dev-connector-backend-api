const {
  required,
  min,
  max,
  email,
  unique,
  same,
  alpha,
  alphaNum,
  num,
  bool,
  float,
  int,
  decimal,
  jwt,
  json,
  postal,
  slug,
  url,
  creditCard,
  mongoId,
  phone,
  nullable,
  next,
} = require("./helpers");
exports.rules = async (validation, fieldName, fieldVal, val) => {
  try {
    switch (validation) {
      case "required":
        return required(fieldName, fieldVal);

      case "min" || "min:":
        return min(fieldName, fieldVal, Number(val));

      case "max":
        return max(fieldName, fieldVal, Number(val));

      case "email":
        return email(fieldVal);

      case "unique":
        return await unique(fieldName, fieldVal, val);

      case "same":
        return same(fieldName, fieldVal);

      case "alpha":
        return alpha(fieldName, fieldVal);

      case "alphaNum":
        return alphaNum(fieldName, fieldVal);

      case "num":
        return num(fieldName, fieldVal);

      case "bool":
        return bool(fieldName, fieldVal);

      case "float":
        return float(fieldName, fieldVal);

      case "int":
        return int(fieldName, fieldVal);

      case "decimal":
        return decimal(fieldName, fieldVal);

      case "jwt":
        return jwt(fieldName, fieldVal);

      case "json":
        return json(fieldName, fieldVal);

      case "postal":
        return postal(fieldName, fieldVal);

      case "slug":
        return slug(fieldName, fieldVal);

      case "url":
        return url(fieldName, fieldVal);

      case "creditCard":
        return creditCard(fieldName, fieldVal);

      case "mongoId":
        return mongoId(fieldVal);

      case "nullable":
        return nullable();

      case "phone":
        return phone(fieldName, fieldVal);

      case "next":
        return next();

      default:
        let err = new Error(
          "validation method",
          `${validation}() invalid method`
        );
        err.validationMethod = `${validation}() invalid method`;
        throw err;
    }
  } catch (error) {
    let err = new Error("validation error", error);
    err.validationMethod = `${validation}() invalid method`;
    throw err;
  }
};
