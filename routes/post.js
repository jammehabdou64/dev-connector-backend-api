const router = require("express").Router();
const {
  index,
  store,
  show,
  like,
  comment,
} = require("../app/controllers/PostsController");
const { asyncHandler } = require("../utils");

router.route("/").get(asyncHandler(index)).post(asyncHandler(store));
router.route("/:post").get(asyncHandler(show));
router.route("/like/:post").put(asyncHandler(like));
router.route("/comment/:post").put(asyncHandler(comment));

module.exports = router;
