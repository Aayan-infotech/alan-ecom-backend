const Windows = require('../models/windowsModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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

const createWindows = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    try {
      const {
        categoryName,
        productName,
        price,
        description,
        subCategory,
        subSubCategory,
      } = req.body;


      const images = req.files ? req.files.map(file => `http://44.196.192.232:5000/uploads/${file.filename}`) : [];

      const newwindowsModel = new Windows({
        productDetails: {
          categoryName,
          productName,
          price,
          description,
          subCategory,
          subSubCategory,
          images,
        },
      });

      const savedwindowsModel = await newwindowsModel.save();

      res.status(200).json({
        status: 200,
        success: true,
        message: "Product created successfully",
        data: savedwindowsModel
      });
    } catch (error) {
      next(error);
    }
  });
};

const addDimensions = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      width,
      height,
      fraction,
      gridOptions,
      finType,
      glassType,
      lockType,
      color,
      temperingOptions,
      sideWindowOpens,
      installationOption,
      instructionQuestion
    } = req.body;

    const updatedDimensions = {
      width,
      height,
      fraction,
      gridOptions,
      finType,
      glassType,
      lockType,
      color,
      temperingOptions,
      sideWindowOpens,
      installationOption,
      instructionQuestion
    };

    const existingWindow = await Windows.findByIdAndUpdate(
      id,
      { $set: { dimensions: updatedDimensions } },
      { new: true }
    );

    if (!existingWindow) {
      return res.status(404).json({ error: "Window not found" });
    }

    res.status(200).json(
      {
        status: 200,
        success: true,
        message: "Dimensions added successfully",
        data: existingWindow,
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to add dimensions" });
  }
};

const getAllWindows = async (req, res) => {
  try {
    const windowsdata = await Windows.find().select("productDetails");

    if (!windowsdata) {
      res.status(404).json({
        status: 404,
        success: true,
        message: "Windows data fetched successfully"
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Windows data fetched successfully",
      data: windowsdata,
    });
  } catch (error) {
    console.error("Error fetching windows data:", error.message);
    res.status(500).json({
      status: 500,
      message: "Failed to fetch windows data",
      error: error.message,
    });
  }
};

const getWindowByID = async (req, res) => {
  try {
    const { id } = req.params;
    const window = await Windows.findById(id);

    if (!window) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product data fetched successfully",
      data: window,
    });
  } catch (error) {
    console.error("Error fetching Product by ID:", error.message);
    res.status(500).json({
      status: 500,
      message: "Failed to fetch Product by ID",
      error: error.message,
    });
  }
};

const deleteWindows = async (req, res) => {
  try {
    const { id } = req.params
    const window = await Windows.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Window Deleted successfully",
      data: window
    })
  } catch (error) {
    console.error(error);
  }
}

const updateWindowsProduct = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: err.message,
      });
    }

    try {
      const { id } = req.params;
      const {
        productName,
        categoryName,
        price,
        description,
        subCategory,
        subSubCategory,
      } = req.body;

  
      const existingWindow = await Windows.findById(id);
      console.log(existingWindow);
      if (!existingWindow) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Product not found",
        });
      }

    
      let images = existingWindow.productDetails.images || [];
      if (req.files && req.files.length > 0) {
        images = req.files.map(file => `http://44.196.192.232:5000/uploads/${file.filename}`);
      }

  
      const updatedDetails = {
        categoryName: categoryName || existingWindow.productDetails.categoryName,
        productName: productName || existingWindow.productDetails.productName,
        price: price || existingWindow.productDetails.price,
        description: description || existingWindow.productDetails.description,
        subCategory: subCategory || existingWindow.productDetails.subCategory,
        subSubCategory: subSubCategory || existingWindow.productDetails.subSubCategory,
        images,
      };

    
      const updatedWindow = await Windows.findByIdAndUpdate(
        id,
        { productDetails: updatedDetails },
        { new: true }
      );

  
      res.status(200).json({
        status: 200,
        success: true,
        message: "Product updated successfully",
        data: updatedWindow,
      });
    } catch (error) {
      next(error);
    }
  });
};


const getDimensions = async (req, res) => {
  try {
    const { id } = req.params;
    const window = await Windows.findById(id);

    if (!window) {
      return res.status(404).json({ error: "Window not found" });
    }

    const dimensions = window.dimensions;

    res.status(200).json({
      status: 200,
      success: true,
      message: "Dimensions fetched successfully",
      data: dimensions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createWindows,
  addDimensions,
  getAllWindows,
  getWindowByID,
  deleteWindows,
  updateWindowsProduct,
  getDimensions
}

