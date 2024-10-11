const mongoose = require("mongoose");

const doorsModel = new mongoose.Schema({
  width: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  fraction: {
    type: String,
    required: true,
  },
  grid: {
    type: String,
    required: true,
  },
  fin_type: {
    type: String,
    required: true,
  },
  glass_type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  tempering_options: {
    type: String,
    required: true,
  },
  side_window: {
    type: String,
    required: true,
  },
  installation_option: {
    type: String,
    required: true,
  },
  instruction_qustion: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("doors", doorsModel);
