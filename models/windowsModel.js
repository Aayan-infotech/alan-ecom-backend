const mongoose = require("mongoose");

const windowsModel = new mongoose.Schema({
  categoryName: {
    type: String,
    required: false,
    default: "Windows",
  },
  productName: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  subCategory: {
    type: String,
    required: false,
  },
  subSubCategory: {
    type: String,
    required: false,
  },
  width: {
    type: [String],
    required: false,
  },
  height: {
    type: [String],
    required: false,
  },
  fraction: {
    type: [String],
    required: false,
  },
  gridOptions: {
    type: [String],
    required: false,
  },
  finType: {
    type: [String],
    required: false,
  },
  glassType: {
    type: [String],
    required: false,
  },
  lockType: {
    type: [String],
    required: false,
  },
  color: {
    type: [String],
    required: false,
  },
  temperingOptions: {
    type: [String],
    required: false,
  },
  sideWindowOpens: {
    type: [String],
    required: false,
  },
  installationOption: {
    type: [String],
    required: false,
  },
  instructionQuestion: {
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

module.exports = mongoose.model("windows", windowsModel);
