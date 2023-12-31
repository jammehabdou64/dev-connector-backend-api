const router = require("express").Router();
const { asyncHandler } = require("../utils");
const { register, login } = require("../app/controllers/AuthController");

router.route("/register").post(asyncHandler(register));
router.route("/login").post(asyncHandler(login));

module.exports = router;
