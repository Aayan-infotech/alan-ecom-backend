const mongoose = require("mongoose");

const requestEstimationModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("request-estimation", requestEstimationModel);
