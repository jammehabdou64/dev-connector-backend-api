const FormRequest = require("../../helper/formRequest");
const Message = require("../model/Message");

class MessageRequest extends FormRequest {
  constructor(req) {
    super(req);
  }

  async rules() {
    return this.validate({
      recipient: ["required"],
      text: ["required"],
    });
  }

  async save() {
    await this.rules();

    const message = new Message();
    message.recipient = this.recipient;
    message.sender = this.req.id;
    message.text = this.text;
    return message.save();
  }
}

module.exports = MessageRequest;
