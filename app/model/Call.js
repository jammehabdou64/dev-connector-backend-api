const mongoose = require("mongoose");

const callSchema = new mongoose.Schema(
  {
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    answer: {
      type: Boolean,
      default: false,
    },

    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Call", callSchema);
