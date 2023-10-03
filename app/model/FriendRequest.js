const mongoose = require("mongoose");

const FriendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    seen: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "accept", "delete"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
