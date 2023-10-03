const router = require("express").Router();
const { asyncHandler } = require("../utils");
const {
  register,
  login,
  changePassword,
} = require("../app/controllers/AuthController");

router.route("/register").post(asyncHandler(register));
router.route("/login").post(asyncHandler(login));
// router.route("/change-password").patch(asyncHandler(changePassword));

module.exports = router;
