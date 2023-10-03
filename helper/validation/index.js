const { runValidation } = require("./runValidation");
const { throwException } = require("../../errorHandler/throwException");
class Validation {
  async apiValidation(req, formData) {
    const validation = await runValidation(req, formData);

    const errors = validation.errors;
    if (errors && Object.keys(errors).length > 0) {
      return throwException(errors);
    }
    return validation.validateData;
  }
}
module.exports = new Validation();
