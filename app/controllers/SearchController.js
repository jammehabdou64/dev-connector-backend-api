const User = require("../model/User");
class SearchController {
  async index(req, res, next) {
    const query = req.query?.user;

    if (query) {
      const users = await User.find({
        name: { $regex: query, $options: "i" },
      }).select(["name", "email", "avatar"]);
      return res.json({ message: users, success: true });
    }

    return res.json({ message: "Search not found", success: false });
  }
}

module.exports = new SearchController();
