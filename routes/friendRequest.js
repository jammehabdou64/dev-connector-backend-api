const router = require("express").Router();
const { asyncHandler } = require("../utils");
const {
  index,
  store,
  destroy,
} = require("../app/controllers/FriendRequestsController");

router.route("/").get(asyncHandler(index));
router.route("/").post(asyncHandler(store));
router.route("/:removeId").delete(destroy);

module.exports = router;
