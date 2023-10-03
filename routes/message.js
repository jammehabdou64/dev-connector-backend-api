const router = require("express").Router();
const { asyncHandler } = require("../utils");
const {
  index,
  store,
  getMessage,
  messageSeen,
} = require("../app/controllers/MessagesController");

router.route("/").get(asyncHandler(index));
router.route("/").post(asyncHandler(store));
router.route("/:user").get(asyncHandler(getMessage));
router.route("/:sender").put(asyncHandler(messageSeen));

module.exports = router;
