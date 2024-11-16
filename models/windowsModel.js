const mongoose = require("mongoose");

const windowsModel = new mongoose.Schema({
  productDetails:{
    categoryName: {
      type: String,
      required: false,
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
    images: {
      type: Array,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  dimensions:{
    width: {
      type: [
        {
          width: String,
          price: Number
        }
      ],
      required: false,
    },
    height: {
      type: [
        {
          height: String,
          price: Number
        }
      ],
      required: false,
    },
    fraction: {
      type: [
        {
          fraction: String,
          price: { type: Number, required: false },
        },
      ],
      required: false,
    },
    gridOptions: {
      type: [
        {
          gridOptions: String,
          price: { type: Number, required: false },
        },
      ],
      required: false,
    },
    finType: {
      type: [
        {
          finType: String,
          price: { type: Number, required: false },
        },
      ],
      required: false,
    },
    glassType: {
      type: [
        {
          glassType: String,
          price: { type: Number, required: false },
        },
      ],
      required: false,
    },
    lockType: {
      type: [
        {
          lockType: String,
          price: { type: Number, required: false },
        },
      ],
      required: false,
    },
    color: {
      type: [
        {
          color: String,
          price: { type: Number, required: false },
        },
      ],
      required: false,
    },
    temperingOptions: {
      type: [
        {
          temperingOptions: String,
          price: { type: Number, required: false },
        },
      ],
      required: false,
    },
    sideWindowOpens: {
      type: [
        {
          sideWindowOpens: String,
          price: { type: Number, required: false },
        },
      ],
      required: false,
    },
    installationOption: {
      type: [
        {
          installationOption: String,
          price: Number
        },
      ],
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
  });

module.exports = mongoose.model("windows", windowsModel);
