const router = require("express").Router();
const {
  index,
  store,
  show,
  like,
  comment,
  myPost,
  destroy,
} = require("../app/controllers/PostsController");
const { asyncHandler } = require("../utils");

router.route("/").get(asyncHandler(index)).post(asyncHandler(store));
router.route("/:post").get(asyncHandler(show));
router.route("/like/:post").put(asyncHandler(like));
router.route("/comment/:post").put(asyncHandler(comment));
router.route("/myposts/:user").get(asyncHandler(myPost));
router.route("/:post").delete(asyncHandler(destroy));

module.exports = router;
