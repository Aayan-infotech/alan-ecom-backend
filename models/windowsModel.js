const mongoose = require("mongoose");

const dimensionTypeSchema = new mongoose.Schema({
  name: String,
  cost: Number
}, { _id: false });  

const dimensionSchema = new mongoose.Schema({
  label: String,
  data: [dimensionTypeSchema]
});


const windowsModel = new mongoose.Schema({
  productDetails: {
    categoryName: {
      type: String,
      required: false,
      default: "Windows"
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
  dimensions: {
    Width_Inches_Fraction: dimensionSchema,
    Height_Inches_Fraction: dimensionSchema,
    fraction: dimensionSchema,
    color: dimensionSchema,
    Select_Grid_Options: dimensionSchema,
    Fin_Type: dimensionSchema,
    Glass_Type: dimensionSchema,
    Lock_Option: dimensionSchema,
    Tempering_Option: dimensionSchema,
    Side_Window_Opens: dimensionSchema,
    Installation_Option: dimensionSchema,
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
