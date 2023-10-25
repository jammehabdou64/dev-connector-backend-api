const { throwException } = require("../../errorHandler/throwException");
const FormRequest = require("../../helper/formRequest");
const Post = require("../model/Post");
const Notification = require("../model/Notification");
const path = require("path");
const cloudinaryUpload = require("../../utils/cloudinary");

class PostRequest extends FormRequest {
  constructor(req) {
    super(req);
  }

  checkIfImage(filename) {
    const extensions = [".svg", ".jpeg", ".jpg", ".png", ".webp"];
    const fileExtension = path.extname(filename).toLocaleLowerCase();

    return extensions.includes(fileExtension);
  }

  async save() {
    const post = new Post();
    const { title, text } = this.request();
    if (!title && !text && !this.req.file) {
      return throwException({ post: "provide atleast one field" });
    }
    post.author = this.req.id;
    post.title = title;
    post.text = text;

    if (this.checkIfImage(this.req.file?.filename)) {
      if (this.req.file) {
        const result = await cloudinaryUpload(this.req?.file?.path);
        post.image = result?.url;
      } else {
        post.image = post.image;
      }
    }

    if (!this.checkIfImage(this.req.file?.filename)) {
      if (this.req.file) {
        const result = await cloudinaryUpload(this.req?.file?.path);
        post.video = result?.url;
      } else {
        post.video = post.video;
      }
    }

    return post.save();
  }

  async like() {
    await this.validate({
      id: ["required"],
      name: ["required"],
      avatar: ["required"],
    });

    const post = await Post.findById(this.route("post"));
    const index = post.likes?.findIndex((like) => like.user?.id === this.id);

    if (index > -1) {
      post.likes.splice(index, 1);

      await post.save();

      return Post.find()
        .populate("author", ["name", "eamil", "avatar"])
        .sort({ createdAt: "-1" });
    }
    const myId = this.req.id;
    const { name, id, avatar } = this.request();
    const newLike = { name, id, avatar };
    post.likes.unshift({ user: newLike });

    //
    if (post.author.toString() !== myId) {
      await Notification.create({
        post: this.route("post"),
        from: id,
        to: post.author.toString(),
        type: "like",
        description: "like post",
      });
    }

    await post.save();
    return Post.find()
      .populate("author", ["name", "eamil", "avatar"])
      .sort({ createdAt: "-1" });
  }

  async comment() {
    await this.validate({
      id: ["required"],
      name: ["required"],
      avatar: ["required"],
      text: ["required"],
    });
    let post = await Post.findById(this.route("post"));
    const { name, id, avatar, text } = this.request();
    const newComment = { user: { name, id, avatar }, text };
    post.comments.unshift(newComment);

    if (post.author.toString() !== id) {
      await Notification.create({
        post: this.route("post"),
        from: id,
        to: post.author.toString(),
        type: "comment",
        description: "comment post",
      });
    }
    await post.save();
    return Post.find()
      .populate("author", ["name", "eamil", "avatar"])
      .sort({ createdAt: "-1" });
  }
}

module.exports = PostRequest;
