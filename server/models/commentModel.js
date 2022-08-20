const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: false,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
