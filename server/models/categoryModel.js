const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  minAge: {
    type: Number,
    required: false,
  },

  maxAge: {
    type: Number,
    required: false,
  },

  gender: {
    type: String,
    required: false,
  },

  specialize: {
    type: String,
    required: false,
  },

  description: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
