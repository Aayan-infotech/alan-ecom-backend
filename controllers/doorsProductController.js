const doorsModel = require("../models/doorsModel.js");
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Define the file name
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images Only!'));
    }
  }
}).array('images', 10);

const createDoorss = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    try {
      const {
        productName,
        categoryName,
        price,
        description,
        subCategory,
        subSubCategory,
      } = req.body;


      const images = req.files ? req.files.map(file => `http://44.196.192.232:5000/uploads/${file.filename}`) : [];

      const newdoorsModel = new doorsModel({
        productName,
        categoryName,
        price,
        description,
        subCategory,
        subSubCategory,
        images
      });

      const saveddoorsModel = await newdoorsModel.save();

      res.status(200).json({
        success: true,
        message: "Stylist created successfully",
        data: saveddoorsModel
      });
    } catch (error) {
      next(error);
    }
  });
};

const addDimensions = async (req, res) => {
  try {
    const { id } = req.params;
    const { frameWidthAndHeight, addPrefinish, doorSwingDirection, jampSize, sill, doorShoe, weatherstrip,
      boreOptions, hinges, preHungOptions, caulkingOption, installationOption} = req.body;

    const existingDoors = await doorsModel.findByIdAndUpdate(id, { frameWidthAndHeight, addPrefinish, doorSwingDirection, jampSize, sill, 
      doorShoe, weatherstrip, boreOptions, hinges, preHungOptions, caulkingOption, installationOption }, { new: true });

    res.status(201).json({ message: "dimensions added successfully", dimensions: existingDoors });
  } catch (error) {
    res.status(500).json({ error: "Failed to add dimensions" });
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

const updateDoorsProduct = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    try {
      const { id } = req.params; // Extract the ID from the URL parameters
      const {
        productName,
        categoryName,
        price,
        description,
        subCategory,
        subSubCategory,
      } = req.body;


      const existingDoor = await doorsModel.findById(id);
      if (!existingDoor) {
        return res.status(404).json({
          statusCode: 404,
          status: "error",
          message: "Product not found",
        });
      }

      
      let images = existingDoor.images; 
      if (req.files && req.files.length > 0) {
        images = req.files.map(file => `http://44.196.192.232:5000/uploads/${file.filename}`);
      }


      const updatedDoor = await doorsModel.findByIdAndUpdate(
        id,
        {
          productName,
          categoryName,
          price,
          description,
          subCategory,
          subSubCategory,
          images
        },
        { new: true } // Return the updated document
      );

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedDoor
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = {
  createDoorss,
  addDimensions,
  allDoorsProduct,
  doosProductById,
  deleteDoorsProduct,
  updateDoorsProduct
};
