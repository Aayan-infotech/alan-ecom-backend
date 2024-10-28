const Windows = require('../models/windowsModel');
const multer = require('multer')
const path = require('path')

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
            productName,
            price,
            description,
            subCategory,
            subSubCategory,
          } = req.body;

      
          const images = req.files ? req.files.map(file => `http://44.196.192.232:5000/uploads/${file.filename}`) : [];

          const newwindowsModel = new Windows({
            productName,
            price,
            description,
            subCategory,
            subSubCategory,
            images
          });

          const savedwindowsModel = await newwindowsModel.save();

          res.status(200).json({
              success: true,
              message: "Stylist created successfully",
              data: savedwindowsModel
          });
      } catch (error) {
          next(error);
      }
  });
};

const getAllWindows = async(req, res) => {
  try{
    const windowsdata = await Windows.find();
    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: windowsdata,
    });
  }catch(error){
    console.error(error);
  }
}

const deleteWindows = async (req, res) => {
  try{
    const {id} = req.params
    const window = await Windows.findByIdAndDelete(id);
    res.status(200).json({
      message: "Window Deleted successfully",
      data: window
    })
  }catch(error){
    console.error(error);
  }
}

const updateWindowsProduct = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
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
      if (!existingWindow) {
        return res.status(404).json({
          statusCode: 404,
          status: "error",
          message: "Product not found",
        });
      }

      let images = existingWindow.images; 
      if (req.files && req.files.length > 0) {
        images = req.files.map(file => `http://44.196.192.232:5000/uploads/${file.filename}`);
      }

      const updatedWindow = await Windows.findByIdAndUpdate(
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
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedWindow
      });
    } catch (error) {
      next(error);
    }
  });
};


module.exports = {
    createWindows,
    getAllWindows,
    deleteWindows,
    updateWindowsProduct
}

