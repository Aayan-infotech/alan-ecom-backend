const blogModel = require("../models/blogModel");

const createBlog = async (req, res) => {
  try {
    const { name, title, description, createdBy } = req.body;
    if (!name || !title || !description || !createdBy || !req.file) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "All fields are required, including the image",
      });
    }
    const response = new blogModel({
      name,
      title,
      description,
      createdBy,
      image: req.file.path,
    });
    await response.save();
    res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Blog created successfully",
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

const allBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
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

const blogById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await blogModel.findById(id);
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
  createBlog,
  allBlogs,
  blogById,
};