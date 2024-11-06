const mongoose = require("mongoose");

const doorsModel = new mongoose.Schema({
  categoryName: {
    type: String,
    default: "Doors",
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: false,
  },
  subSubCategory: {
    type: String,
    required: false,
  },
  frameWidthAndHeight: {
    type: [String],
    required: false,
  },
  addPrefinish: {
    type: [String],
    required: false,
  },
  doorSwingDirection: {
    type: [String],
    required: false,
  },
  jampSize: {
    type: [String],
    required: false,
  },
  sill: {
    type: [String],
    required: false,
  },
  doorShoe: {
    type: [String],
    required: false,
  },
  weatherstrip: {
    type: [String],
    required: false,
  },
  boreOptions: {
    type: [String],
    required: false,
  },
  hinges: {
    type: [String],
    required: false,
  },
  preHungOptions: {
    type: [String],
    required: false,
  },
  caulkingOption: {
    type: [String],
    required: false,
  },
  installationOption: {
    type: [String],
    required: false,
  },
  images: {
    type: Array,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("doors", doorsModel);
