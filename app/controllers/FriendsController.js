const User = require("../model/User");
const FriendRequest = require("../request/FriendRequest");

class FriendsController {
  async findFriends(req, res, next) {
    const user = await User.findById(req.id).populate("friends");
    const userFriends = user.friends;
    const getAllusers = await User.find()
      .ne("email", user.email)

      .ne("email", user.email)
      .limit(20);

    if (userFriends.length > 0) {
      const result = userFriends.map((friend) =>
        getAllusers.filter(
          (user) => friend._id.toString() !== user._id.toString(),
          0
        )
      )[0];
      return res.json({ message: result, success: true });
    }

    return res.json({ message: getAllusers, success: true });
  }

  async addFriend(req, res, next) {
    const friendRequest = new FriendRequest(req);
    const save = await friendRequest.save();
    return res.json(save);
  }
}

module.exports = new FriendsController();
