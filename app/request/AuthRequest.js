const FormRequest = require("../../helper/formRequest");
const User = require("../model/User");
const { bcrypt, saveImage, verifyHash, jwtSign } = require("../../utils");
const { throwException } = require("../../errorHandler/throwException");
const cloudinaryUpload = require("../../utils/cloudinary");

class AuthRequest extends FormRequest {
  async rules() {
    return this.validate({
      name: ["required"],
      email: [
        "required",
        "email",
        `${this.route("user") ? "next" : "unique:User"}`,
      ],
      password: ["required", "min:6"],
      avatar: ["nullable"],
    });
  }

  async save() {
    await this.rules();
    const user = this.route("user")
      ? await this.findId("User", this.route("user"))
      : new User();

    // const PORT = process.env.PORT || process.env.NODE_ENV;

    user.name = this.name;
    user.email = this.email;
    user.password = await bcrypt(this.password);
    user.role = this.role || "user";
    user.avatar = this.req.files
      ? `${process.env.HOST}/users/${saveImage(
          this.req,
          "avatar",
          "image/users"
        )}`
      : `${process.env.HOST}/users/default.png`;

    const registerUser = await user.save();
    return jwtSign(registerUser._id.toString());
  }

  async login() {
    const user = await User.findOne({ email: this.email || "" }).select(
      "+password"
    );

    if (!user) {
      return throwException({ email: "Invalid credentials" });
    }
    const isMatch = await verifyHash(this.password, user.password);
    if (!isMatch) {
      return throwException({ email: "Invalid credentials" });
    }
    return jwtSign(user._id.toString());
  }

  async changeProfile() {
    if (!this.req.file) {
      return throwException({ profile: "Profile image is required" });
    }

    const user = await User.findById(this.req.id);

    const result = await cloudinaryUpload(this.req.file?.path);
    user.avatar = result?.url;
    return user.save();
  }

  async changePassword() {
    await this.validate({
      oldPassword: ["required"],
      newPassword: ["required"],
      confirmPassword: ["required", "same:newPassword"],
    });

    const user = await User.findById(this.req.id).select("+password");
    const match = await verifyHash(this.oldPassword, user.password);
    if (!match) {
      return throwException({ oldPassword: "Incorrect password" });
    }
    user.password = await bcrypt(this.newPassword);
    return user.save();
  }
}

module.exports = AuthRequest;
