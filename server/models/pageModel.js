const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PageSchema = new Schema({
  tagName: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
});

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;
