const Windows = require('../models/windowsModel');
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

      
          const images = req.files ? req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`) : [];

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

module.exports = {
    createWindows
}

