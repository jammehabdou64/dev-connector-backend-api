const router = require("express").Router();
const { asyncHandler } = require("../utils");
const User = require("../app/model/User");
const user = async (req, res) => {
  const user = await User.findById(req.params.user);
  return res.json({ message: user, success: true });
};

router.route("/:user").get(asyncHandler(user));

module.exports = router;
