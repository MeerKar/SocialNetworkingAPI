const { Thought, User, reactionSchema } = require("../models");
const mongoose = require("mongoose");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts,
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a thought by id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought } },
        { runValidators: true, new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      await User.updateMany(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a new reaction
  async addReaction(req, res) {
    console.log("Adding a reaction");

    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    console.log(thoughtId, req.body);
    try {
      const reaction = {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody,
        username,
      };
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: reaction } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }
      console.log(thought);

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // remove a reation
  async removeReaction(req, res) {
    console.log("You are deleting a reaction");
    try {
      const { thoughtId } = req.params;
      const { reactionId } = req.body;
      console.log(reactionId);
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }
      console.log(thought);

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
