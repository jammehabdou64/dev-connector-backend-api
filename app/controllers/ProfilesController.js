const Profile = require("../model/Profile");
const User = require("../model/User");
const ProfileRequest = require("../request/ProfileRequest");
class ProfilesController {
  async index(req, res, next) {
    const profile = await Profile.find().populate("user", [
      "name",
      "email",
      "avatar",
      "location",
    ]);
    return profile
      ? res.json({ message: profile, success: true })
      : res.json({
          message: "There is no profile for this user",
          success: false,
        });
  }

  async store(req, res, next) {
    const profileRequest = new ProfileRequest(req);
    return res.json({ message: await profileRequest.save(), success: true });
  }

  async getAuthProfile(req, res, next) {
    const profile = await Profile.findOne({ user: req.id }).populate("user", [
      "name",
      "email",
      "avatar",
      "location",
    ]);
    return profile
      ? res.json({ message: profile, success: true })
      : res.json({
          message: await User.findById(req.id).select(
            "name email avatar location"
          ),
          success: true,
        });
  }

  async show(req, res, next) {
    const profile = await Profile.findOne({
      user: req.id,
    }).populate("user", ["name", "email", "avatar", "location"]);
    return profile
      ? res.json({ message: profile, success: true })
      : res.json({
          message: "Profile not found",
          success: null,
        });
  }

  async edit(req, res, next) {
    const profile = await Profile.findOne({
      user: req.params.profile,
    }).populate("user", ["name", "email", "avatar", "location"]);
    return profile
      ? res.json({ message: profile, success: true })
      : res.json({
          message: await User.findById(req.params.profile).select([
            "name",
            "email",
            "avatar",
            "location",
          ]),
          success: null,
        });
  }

  async addExperience(req, res, next) {
    const profileRequest = new ProfileRequest(req);
    await profileRequest.experience();
    const user = await Profile.findOne({ user: req.id }).populate({
      path: "user",
      populate: {
        path: "friends",
      },
    });
    return res.json({ message: user, success: true });
  }

  async deleteExperience(req, res, next) {
    const profile = await Profile.findOne({ user: req.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.experience);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
  }

  async addEducation(req, res, next) {
    const profileRequest = new ProfileRequest(req);
    await profileRequest.education();
    const user = await Profile.findOne({ user: req.id }).populate({
      path: "user",
      populate: {
        path: "friends",
      },
    });
    return res.json({ message: user, success: true });
  }

  async deleteEducation(req, res, next) {
    const profile = await Profile.findOne({ user: req.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.education);
    profile.education.splice(removeIndex, 1);
    await profile.save();
  }

  async destroy(req, res, next) {
    await Profile.findByIdAndRemove({ user: req.id });
    await User.findByIdAndRemove({ _id: req.id });
    return res.json({ message: "Account deleted successfully", success: true });
  }
}

module.exports = new ProfilesController();
