const mongoose = require('mongoose');

const dimensionTypeSchema = new mongoose.Schema({
    name: String,
    cost: Number
}, { _id: false });

const dimensionSchema = new mongoose.Schema({
    label: String,
    data: [dimensionTypeSchema]
});

const hardwareModel = new mongoose.Schema({
    productDetails: {
        categoryName: {
            type: String,
            required: true
        },
        subCategory: {
            type: String,
            required: false
        },
        subSubCategory: {
            type: String,
            required: false
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
        phgHandlesets: dimensionSchema,
        selectLeverOptions: dimensionSchema,
        selectKnobOptions: dimensionSchema,
        selectTypeOfHandleset: dimensionSchema,
        selectDeadboltStyle: dimensionSchema,
        selectHardwareFinish: dimensionSchema,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("hardware", hardwareModel);