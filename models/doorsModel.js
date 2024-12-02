const mongoose = require("mongoose");

const dimensionTypeSchema = new mongoose.Schema({
  name: String,
  cost: Number
}, { _id: false });  

const dimensionSchema = new mongoose.Schema({
  label: String,
  data: [dimensionTypeSchema]
});

const doorsModel = new mongoose.Schema({
  productDetails: {
    categoryId: {
      type: String,
      required: true
    },
    categoryName: {
      type: String,
      required: true
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
    images: {
      type: Array,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  dimensions: {
    frameWidthAndHeight: dimensionSchema,
    gridOption: dimensionSchema,
    frameExtrusion: dimensionSchema,
    color: dimensionSchema,
    installationOption: dimensionSchema,
    sideTheWindowOpens: dimensionSchema,
    doorSwingDirection: dimensionSchema,
    lockOption: dimensionSchema,
    glassOption: dimensionSchema,
    addPrefinish: dimensionSchema,
    boreOptions: dimensionSchema,
    jambSize: dimensionSchema,
    sill: dimensionSchema,
    doorShoe: dimensionSchema,
    weatherStrip: dimensionSchema,
    hinges: dimensionSchema,
    preHungOptions: dimensionSchema,
    selectPrefinishing: dimensionSchema,
    hingeColor: dimensionSchema,
    weatherStripColor: dimensionSchema,
    peepView: dimensionSchema,
    speakEasyOption: dimensionSchema,
    selectGlassforDoor: dimensionSchema,
    selecttheFrameSize: dimensionSchema,
    
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("doors", doorsModel);
