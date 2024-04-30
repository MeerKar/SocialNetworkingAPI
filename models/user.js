const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
      index: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "reaction",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Increases friend count in User model object when friends are added by a user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Creates User model with userSchema
const User = model("user", userSchema);

// Exports
module.exports = User;
