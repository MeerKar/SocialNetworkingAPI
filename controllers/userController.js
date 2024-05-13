const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// Aggregation function to count the number of users
const userCount = async () => {
  try {
    const [{ number_of_users: count }] = await User.aggregate([
      {
        $group: {
          _id: null,
          number_of_users: { $count: {} },
        },
      },
    ]);
    return count;
  } catch (err) {
    console.error("Error counting users:", err);
    return 0;
  }
};

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
        totalCount: await userCount(),
      };
      return res.json(userObj);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .lean();

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      req.body.friends = [];
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const updateFields = {};
      if (req.body.username) {
        updateFields.username = req.body.username;
      }
      if (req.body.email) {
        updateFields.email = req.body.email;
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: updateFields },
        { runValidators: true, new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Delete a user and remove associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Add a friend
  async addFriend(req, res) {
    console.log("You are adding a friend");

    const { userId, friendId } = req.params;
    try {
      const friend = await User.findOne({ _id: friendId });
      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with that ID" });
      }
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friend._id } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Remove a friend
  async removeFriend(req, res) {
    console.log("You are deleting a friend");

    const { userId, friendId } = req.params;
    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: new ObjectId(friendId) } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
