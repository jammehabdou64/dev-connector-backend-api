const Message = require("../model/Message");
const MessageRequest = require("../request/MessageRequest");
class MessagesController {
  async index(req, res, next) {
    const messages = await Message.find()
      .where("recipient", req.id)
      .populate("sender recipient", ["name", "email", "avatar"])
      .sort({ createdAt: "1" });
    const numsOfMessages = await Message.find()
      .where("recipient", req.id)
      .where("seen", false)
      .countDocuments();

    return res.json({
      message: [
        ...new Map(messages.map((msg) => [msg.sender._id, msg])).values(),
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      numsOfMessages,
      success: true,
    });
  }

  async getMessage(req, res, next) {
    const messages = await Message.find({
      $or: [
        { $and: [{ sender: req.id }, { recipient: req.params.user }] },
        { $and: [{ recipient: req.id }, { sender: req.params.user }] },
      ],
    });
    return res.json({ message: messages, success: true });
  }

  async store(req, res, next) {
    const messageRequest = new MessageRequest(req);
    const save = await messageRequest.save();
    return res.json({ message: save, success: true });
  }

  async messageSeen(req, res, next) {
    const message = await Message.updateMany(
      { sender: req.body?.sender?._id },
      { $set: { seen: true } }
    );
    return res.json({ message, success: true });
  }
}

module.exports = new MessagesController();
