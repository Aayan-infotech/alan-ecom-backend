const spotDeailsModel = require("../models/spotlightDealsModel");

const createSpotlightDealsProduct = async (req, res) => {
  try {
    const { product_name, product_price, createdBy } = req.body;
    if (!product_name || !product_price || !createdBy || !req.file) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "All fields are required, including the image",
      });
    }
    const response = new spotDeailsModel({
      product_name,
      product_price,
      createdBy,
      image: req.file.path,
    });
    await response.save();
    res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error creating product",
      error: error.message,
    });
  }
};

const allSpotlightDealsProduct = async (req, res) => {
  try {
    const products = await spotDeailsModel.find();
    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error fetching products",
      error: error.message,
    });
  }
};

const spotlightDealsProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await spotDeailsModel.findById(id);
    if (!response) {
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error fetching product by ID",
      error: error.message,
    });
  }
};

module.exports = {
  createSpotlightDealsProduct,
  allSpotlightDealsProduct,
  spotlightDealsProductById,
};
