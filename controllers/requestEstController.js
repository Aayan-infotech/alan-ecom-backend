const requestEstimationModel = require("../models/requestEstimationModel");

const createRequest = async (req, res) => {
  try {
    const { name, email_address, phone_no, message } = req.body;
    if (!name || !email_address || !phone_no || !message) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "All fields are required.",
      });
    }
    const response = new requestEstimationModel({
      name,
      email_address,
      phone_no,
      message,
    });
    await response.save();
    res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Reqeust Estimation sent successfully",
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

const allRequestEstimation = async (req, res) => {
  try {
    const blogs = await requestEstimationModel.find();
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

const deleteRequestEstitmation = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRequest = await requestEstimationModel.findByIdAndDelete(id);
      if (!deletedRequest) {
        return res.status(404).json({
          statusCode: 404,
          status: "error",
          message: "Request Estimation not found.",
        });
      }
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Request Estimation deleted successfully.",
        data: deletedRequest,
      });
    } catch (error) {
      console.error("Error deleting Request Estimation:", error);
      res.status(500).json({
        statusCode: 500,
        status: "error",
        message: "Error deleting Request Estimation",
        error: error.message,
      });
    }
  };
  

module.exports = { createRequest, allRequestEstimation, deleteRequestEstitmation };
