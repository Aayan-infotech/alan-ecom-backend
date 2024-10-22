const mongoose = require("mongoose");

const windowsModel = new mongoose.Schema({
  categoryName: {
    type: String,
    required: false,
    default: "Windows",
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
  width: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  fraction: {
    type: String,
    required: false,
  },
  grid: {
    type: String,
    required: false,
  },
  fin_type: {
    type: String,
    required: false,
  },
  glass_type: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  tempering_options: {
    type: String,
    required: false,
  },
  side_window: {
    type: String,
    required: false,
  },
  installation_option: {
    type: String,
    required: false,
  },
  instruction_qustion: {
    type: String,
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
