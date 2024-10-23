const feedBackModel = require("../models/feedBackModel");

const createFeedback = async (req, res) => {
  try {
    const { name, review, rating, createdBy } = req.body;
    if (!name || !review || !rating || !createdBy || !req.file) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "All fields are required, including the image",
      });
    }
    const response = new feedBackModel({
      name,
      review,
      rating,
      createdBy,
      image: req.file.path,
    });
    await response.save();
    res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Customer Feedback created successfully",
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

const allCustomerFeedback = async (req, res) => {
  try {
    const blogs = await feedBackModel.find();
    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

const customerFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await feedBackModel.findById(id);
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

module.exports = { createFeedback, allCustomerFeedback, customerFeedbackById };
