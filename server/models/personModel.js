const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  tagName: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  public: {
    type: Boolean,
    required: true,
  },

  page: {
    type: Schema.Types.ObjectId,
    ref: "Page",
    required: false,
  },
});

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
