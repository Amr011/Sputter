const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isBan: {
    type: Boolean,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
