const Post = require("../model/Post");
const PostRequest = require("../request/PostRequest");

class PostsController {
  async index(req, res, next) {
    const posts = await Post.find()
      .populate("author", ["name", "eamil", "avatar"])
      .sort({ createdAt: "-1" });
    return res.json({ message: posts, success: true });
  }

  async store(req, res, next) {
    const postRequest = new PostRequest(req);
    const save = await postRequest.save();
    const result = await Post.findById(save._id.toString()).populate("author", [
      "name",
      "eamil",
      "avatar",
    ]);
    return res.json({ message: result, success: true });
  }

  async show(req, res, next) {
    const post = await Post.findById(req.params.post).populate("author", [
      "name",
      "eamil",
      "avatar",
    ]);
    return res.json({ message: post, success: true });
  }

  async comment(req, res, next) {
    // console.log();
    // return res.json({ msg: req.body });
    const postRequest = new PostRequest(req);
    const save = await postRequest.comment();
    return res.json({ message: save, success: true });
  }

  async like(req, res, next) {
    const postRequest = new PostRequest(req);
    const save = await postRequest.like();
    return res.json({ message: save, success: true });
  }
}

module.exports = new PostsController();
