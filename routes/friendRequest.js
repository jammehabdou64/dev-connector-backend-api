const router = require("express").Router();
const { asyncHandler } = require("../utils");
const { index, store } = require("../app/controllers/FriendRequestsController");

router.route("/").get(asyncHandler(index));
router.route("/").post(asyncHandler(store));

module.exports = router;
