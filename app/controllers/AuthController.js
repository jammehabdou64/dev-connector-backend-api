const User = require("../model/User");
const AuthRequest = require("../request/AuthRequest");

class AuthController {
  async register(req, res, next) {
    const authRequest = new AuthRequest(req);
    const user = await authRequest.save();
    return user
      ? res.json({ message: user, success: true })
      : res.json({ message: [], success: false });
  }

  async login(req, res, next) {
    const authRequest = new AuthRequest(req);
    const data = await authRequest.login();
    return data
      ? res.json({ message: data, success: true })
      : res.json({ message: [], success: false });
  }

  async user(req, res, next) {
    const user = await User.findById(req.id).select(
      "name email phone friends "
    );
    return user
      ? res.json({ message: user, success: true })
      : res.json({ message: null, success: false });
  }

  async changeProfile(req, res, next) {
    const authRequest = new AuthRequest(req);
    const save = await authRequest.changeProfile();
    return save
      ? res.json({ message: save, success: true })
      : res.json({ message: {}, success: false });
  }

  async changePassword(req, res, next) {
    const authRequest = new AuthRequest(req);
    const save = await authRequest.changePassword();
    return save
      ? res.json({ message: "Password changed successfully", success: true })
      : res.json({ message: "Sorry, an error occur", success: false });
  }
}

module.exports = new AuthController();
