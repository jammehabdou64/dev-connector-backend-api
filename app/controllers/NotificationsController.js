const Notification = require("../model/Notification");

class NotificationsController {
  async index(req, res, next) {
    const notifications = await Notification.find()
      .where("to", req.id)
      .populate("from", ["name", "email", "avatar"])
      .sort({ createdAt: "-1" });

    const numsOfNotifications = await Notification.find()
      .where("to", req.id)
      .where("seen", false)
      .count();
    return res.json({
      message: notifications,
      numsOfNotifications,
      success: true,
    });
  }

  async update(req, res, next) {
    const notification = await Notification.findById(req.params.notification);
    notification.seen = true;
    const result = await notification.save();
    return result
      ? res.json({ message: "updated", success: true })
      : res.json({ message: null, success: false });
  }
}

module.exports = new NotificationsController();
