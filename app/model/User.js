const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    email_verify: {
      type: Boolean,
      required: false,
      default: false,
    },

    avatar: {
      type: String,
      required: false,
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    viewProfile: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    onlineStatus: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      select: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
