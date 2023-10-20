const router = require("express").Router();
const { asyncHandler } = require("../utils");
const {
  show,
  store,
  getAuthProfile,
  destroy,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  edit,
} = require("../app/controllers/ProfilesController");

router.route("/me").get(asyncHandler(getAuthProfile));
router.route("/").post(asyncHandler(store));
router.route("/:profile").get(asyncHandler(show));
router.route("/edit/:profile").get(asyncHandler(edit));
router.route("/").delete(asyncHandler(destroy));
router.route("/experience").put(asyncHandler(addExperience));
router.route("/experience/:experience").delete(asyncHandler(deleteExperience));
router.route("/education").put(asyncHandler(addEducation));
router.route("/education/:education").delete(asyncHandler(deleteEducation));

module.exports = router;
