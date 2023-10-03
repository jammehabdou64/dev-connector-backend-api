const { throwException } = require("../../errorHandler/throwException");
const FriendRequest = require("../model/FriendRequest");

class FriendRequestsController {
  async index(req, res, next) {
    const friendRequests = await FriendRequest.find()
      .where("recipient", req.id)
      .where("seen", false)
      .populate("sender", ["email", "name", "avatar"]);

    const numsOfRequest = await FriendRequest.find()
      .where("recipient", req.id)
      .where("seen", false)
      .count();

    return res.json({ message: friendRequests, numsOfRequest, success: true });
  }

  async store(req, res, next) {
    const { recipient } = req.body;
    if (!recipient) {
      return throwException({ recipient: "Recipient is required" });
    }

    const checkRequestExist = await FriendRequest.find({
      $and: [{ sender: req.id, recipient }],
    });
    if (checkRequestExist.length > 0) {
      return res.json({
        message: "Friend request already sent",
        success: true,
      });
    }

    const friendRequest = new FriendRequest();
    friendRequest.sender = req.id;
    friendRequest.recipient = recipient;
    const result = await friendRequest.save();

    return result
      ? res.json({ message: "Friend request sent", success: true })
      : res.json({ message: "An error occur", success: false }).status(400);
  }
}

module.exports = new FriendRequestsController();
