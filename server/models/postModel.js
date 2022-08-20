const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  tagName: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
