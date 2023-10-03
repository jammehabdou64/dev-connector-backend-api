const router = require("express").Router();
const { asyncHandler } = require("../utils");
const { index, update } = require("../app/controllers/NotificationsController");

router.route("/").get(asyncHandler(index));
router.route("/:notification").put(asyncHandler(update));
module.exports = router;
