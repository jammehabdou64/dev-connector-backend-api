const {
  findFriends,
  addFriend,
} = require("../app/controllers/FriendsController");
const { asyncHandler } = require("../utils");

const router = require("express").Router();

router.route("/find-friend").get(asyncHandler(findFriends));
router.route("/add").post(asyncHandler(addFriend));

module.exports = router;
