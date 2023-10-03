const { throwException } = require("../../errorHandler/throwException");
const FormRequest = require("../../helper/formRequest");
const Profile = require("../model/Profile");

class ProfileRequest extends FormRequest {
  constructor(req) {
    super(req);
  }

  async rules() {
    return this.validate({
      status: ["required"],
      skills: ["required"],
    });
  }

  async save() {
    await this.rules();

    const {
      company,
      website,
      location,
      bio,
      status,
      githubUsername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = this.request();

    const profieFields = {};
    profieFields.user = this.req.id;
    if (company) profieFields.company = company;
    if (website) profieFields.website = website;
    if (location) profieFields.location = location;
    if (bio) profieFields.bio = bio;
    if (status) profieFields.status = status;
    if (githubUsername) profieFields.githubUsername = githubUsername;
    if (skills) {
      profieFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profieFields.social = {};

    if (youtube) profieFields.youtube = profieFields.social.youtube;
    if (twitter) profieFields.twitter = profieFields.social.twitter;
    if (facebook) profieFields.facebook = profieFields.social.facebook;
    if (instagram) profieFields.instagram = profieFields.social.instagram;
    if (linkedin) profieFields.linkedin = profieFields.social.linkedin;

    let profile = await Profile.findOne({ user: this.req.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: this.req.id },
        { $set: profieFields },
        { new: true }
      );
      return profile;
    }

    profile = new Profile(profieFields);
    await profile.save();
    return profile;
  }

  async experience() {
    await this.validate({
      title: ["required"],
      company: ["required"],
      from: ["required"],
    });

    const { title, company, location, from, to, current, description } =
      this.request();

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    const profile = await Profile.findOne({ user: this.req.id });
    profile.experience.unshift(newExperience);

    return profile.save();
  }

  async education() {
    await this.validate({
      school: ["required"],
      degree: ["required"],
      fieldofstudy: ["required"],
      from: ["required"],
    });

    const { school, degree, fieldofstudy, from, to, current, description } =
      this.request();

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    const profile = await Profile.findOne({ user: this.req.id });
    profile.education.unshift(newEducation);

    return profile.save();
  }
}

module.exports = ProfileRequest;
