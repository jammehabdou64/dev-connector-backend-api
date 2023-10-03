const validation = require("./validation");
const { getModel } = require("../utils");
const { throwException } = require("../errorHandler/throwException");

class FormRequest {
  constructor(req) {
    this.req = req;
    const formdata = req.body;
    for (let data in formdata) {
      this[data] = formdata[data] || null;
    }
  }

  query(name) {
    return this.req.query[name];
  }
  route(name) {
    return this.req.params[name];
  }
  request() {
    return this.req.body;
  }

  async validate(formData) {
    return validation.apiValidation(this.req, formData);
  }

  async findId(modelName, id) {
    return getModel(modelName).findById(id);
  }
}

module.exports = FormRequest;

//Enzersdorfer Strasse 45
//0688 571 47 54
