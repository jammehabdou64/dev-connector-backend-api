const FormRequest = require("../../helper/formRequest");
const User = require("../model/User");
const FriendModel = require("../model/FriendRequest");

class FriendRequest extends FormRequest {
  async rules() {
    return this.validate({
      sender: ["required"],
      id: ["required"],
    });
  }

  async save() {
    await this.rules();
    const sender = await User.findById(this.sender);
    sender.friends.unshift(this.req.id);
    const result = await sender.save();
    if (result) {
      const recipient = await User.findById(this.req.id);
      recipient.friends.unshift(this.sender);
      const data = await recipient.save();
      if (data) {
        const friendRequest = await FriendModel.findById(this.id);
        friendRequest.seen = true;
        friendRequest.status = "accept";
        await friendRequest.save();
        return { message: "friend added successfully", success: true };
      }
    }

    return { message: "sorry, An error occur", success: false };
  }
}

module.exports = FriendRequest;
