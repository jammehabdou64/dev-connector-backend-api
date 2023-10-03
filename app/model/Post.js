const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },

    video: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },

    video: {
      type: String,
      required: false,
    },

    likes: [
      {
        user: {
          id: { type: String },
          name: { type: String },
          avatar: { type: String },
        },
      },
    ],

    comments: [
      {
        user: {
          id: { type: String },
          name: { type: String },
          avatar: { type: String },
        },
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
