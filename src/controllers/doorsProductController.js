const doorsModel = require("../models/doorsModel.js");

const createDoors = async (req, res) => {
  try {
    const {
      width,
      height,
      fraction,
      grid,
      fin_type,
      glass_type,
      color,
      tempering_options,
      side_window,
      installation_option,
      instruction_qustion,
      createdBy,
      price,
    } = req.body;

    if (
      !width ||
      !height ||
      !fraction ||
      !grid ||
      !fin_type ||
      !glass_type ||
      !color ||
      !tempering_options ||
      !side_window ||
      !installation_option ||
      !instruction_qustion ||
      !createdBy ||
      !price ||
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "All fields are required, including images",
      });
    }

    const imagePaths = req.files.map((file) => file.path);

    const response = new doorsModel({
      width,
      height,
      fraction,
      grid,
      fin_type,
      glass_type,
      color,
      tempering_options,
      side_window,
      installation_option,
      instruction_qustion,
      images: imagePaths,
      createdBy,
      price,
    });

    await response.save();

    res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Doors created successfully",
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

const updateDoors = async (req, res) => {
  try {
    const {
      width,
      height,
      fraction,
      grid,
      fin_type,
      glass_type,
      color,
      tempering_options,
      side_window,
      installation_option,
      instruction_qustion,
      createdBy,
      price,
    } = req.body;
    const { id } = req.params;
    const door = await doorsModel.findById(id);
    if (!door) {
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "Door product not found",
      });
    }
    let imagePaths = door.images;
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => file.path);
    }
    const updatedDoor = await doorsModel.findByIdAndUpdate(
      id,
      {
        width,
        height,
        fraction,
        grid,
        fin_type,
        glass_type,
        color,
        tempering_options,
        side_window,
        installation_option,
        instruction_qustion,
        images: imagePaths,
        createdBy,
        price,
      },
      { new: true }
    );

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Door product updated successfully",
      data: updatedDoor,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error updating product",
      error: error.message,
    });
  }
};

const allDoorsProduct = async (req, res) => {
  try {
    const doors = await doorsModel.find();
    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: doors,
    });
  } catch (error) {
    console.error("Error fetching doors:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error fetching doors",
      error: error.message,
    });
  }
};

const doosProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await doorsModel.findById(id);
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
      message: "Error fetching doors by ID",
      error: error.message,
    });
  }
};

const deleteDoorsProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await doorsModel.findByIdAndDelete(id);
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
      message: "Doors deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting Request doors:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error deleting Request doors",
      error: error.message,
    });
  }
};

module.exports = {
  createDoors,
  allDoorsProduct,
  doosProductById,
  updateDoors,
  deleteDoorsProduct,
};
