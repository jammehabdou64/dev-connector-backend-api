class ErrorHandler {
  constructor(app) {
    this.app = app;
  }

  handler(err, req, res, next) {
    let error = { ...err };
    let errorMessageType;
    error.message = err.message;
    //monogoose id not found
    if (err.name === "CastError") {
      const message = { [err.path]: ` ${err.kind} not found` };
      error.message = message;
      error.statusCode = 400;
      errorMessageType = "Mongoose";
    }

    //duplicate key
    if (err.code === 11000) {
      let field = Object.keys(err.keyValue)[0];
      error.message = { [field]: `${field} already exist` };
      error.statusCode = 400;
      errorMessageType = "Mongoose";
    }

    //validations error

    if (err.name === "ValidationError") {
      let message = {};

      const errorMessageTypes = Object.values(err.errors);
      for (let i = 0; i < errorMessageTypes.length; i++) {
        let val = errorMessageTypes[i];
        message[val.path] = val.message
          .replace(/[^\w ]/g, "")
          .split(" ")
          .slice(1)
          .join(" ");
      }

      error.message = message;
      error.statusCode = 400;
      errorMessageType = "Validation";
    }
    if (err.apivalidationErrors) {
      error.message = err.apivalidationErrors;
      error.statusCode = 400;
      errorMessageType = "Validation";
    }

    if (err.validationErrors) {
      error.message = err.validationErrors;
      error.statusCode = 400;
      error.message = "validation";
      errorMessageType = "Validation";
      return res.redirectBack();
    }

    if (err.validationMethod) {
      error.message = err.validationMethod;
      error.statusCode = 400;
      errorMessageType = "Validation";
    }

    res.status(error.statusCode || 500).json({
      status: err.status,
      error: error.message,
      message: errorMessageType || "Error",
      stack: err.stack,
    });
  }
}

module.exports = ErrorHandler;
