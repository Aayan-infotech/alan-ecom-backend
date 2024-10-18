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
            price,
            discription,
            subCategory,
            subSubCategory,
          } = req.body;

      
          const images = req.files ? req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`) : [];

          const newdoorsModel = new doorsModel({
            productName,
            price,
            discription,
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
  createDoorss,
  allDoorsProduct,
  doosProductById,
  updateDoors,
  deleteDoorsProduct,
};
