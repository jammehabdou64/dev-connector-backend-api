exports.throwException = (errors = {}) => {
  let err = new Error("validation", errors);
  err.apivalidationErrors = errors;
  throw err;
};
