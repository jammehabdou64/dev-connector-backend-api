const mongoose = require("mongoose");

const NotificatNotifiionSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "delete"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificatNotifiionSchema);
