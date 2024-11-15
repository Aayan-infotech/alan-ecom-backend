const Category = require('../models/CategoryModel');
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
}).single('image');

const addCategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { categoryName } = req.body;

      if (!categoryName) {
        return res.status(400).json({ message: "Category name is required." });
      }

      const imageUrl = req.file ? `http://44.196.192.232:5000/uploads/${req.file.filename}` : null;

      const category = new Category({
        categoryName,
        image: imageUrl,
        subcategories: []
      });

      const savedCategory = await category.save();

      res.status(200).json({ 
        success: true, 
        status: 200,
        message: "Category created successfully",
        data: savedCategory 
      });
    } catch (error) {
      console.error('Error adding/updating category:', error);
      return res.status(500).json({ message: 'Error adding/updating category', error });
    }
  });
};

const addSubCategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { categoryName, subcategoryName } = req.body;

      if (!categoryName || !subcategoryName) {
        return res.status(400).json({ message: "Category name and subcategory name are required." });
      }

      const imageUrl = req.file ? `http://44.196.192.232:5000/uploads/${req.file.filename}` : null;

      let category = await Category.findOne({ categoryName });

      if (category) {
        category.subcategories.push({
          subcategoryName,
          image: imageUrl
        });
      } else {
        category = new Category({
          categoryName,
          subcategories: [{
            subcategoryName,
            image: imageUrl
          }],
        });
      }

      const savedCategory = await category.save();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Sub-Category created successfully",
        data: savedCategory
      });
    } catch (error) {
      console.error('Error adding/updating category:', error);
      return res.status(500).json({ message: 'Error adding/updating category', error });
    }
  });
};


const addSubSubcategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { categoryName, subcategoryName, subSubcategoryName } = req.body;

      if (!subSubcategoryName || subSubcategoryName.trim() === '') {
        return res.status(400).json({ message: 'Sub-subcategory name cannot be empty.' });
      }

      let category = await Category.findOne({ categoryName });

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      let subcategory = category.subcategories.find(sub => sub.subcategoryName === subcategoryName);
      if (!subcategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }

      const imageUrl = req.file ? `http://44.196.192.232:5000/uploads/${req.file.filename}` : null;

      subcategory.subSubcategories.push({
        subSubcategoryName,
        image: imageUrl
      });

      const updatedCategory = await category.save();

      res.status(200).json({ 
        status: 200,
        success: true,
        message: 'Sub-Subcategory added successfully',
        data: updatedCategory 
      });
    } catch (error) {
      console.error('Error adding sub-subcategory:', error);
      res.status(500).json({ message: 'Error adding sub-subcategory', error });
    }
  });
};



const getAllProductCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('categoryName image');
    res.status(200).json({
      status: 200,
      success: true,
      message: "All Category",
      data: categories
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json({
      status: 200,
      success: true,
      message: "All Category",
      data: categories
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findById(id)

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subcategories = category.subcategories.map(subcategory => ({
      _id: subcategory._id,
      subcategoryName: subcategory.subcategoryName,
      image: subcategory.image
    }));

    res.status(200).json({
      status: 200,
      success: true,
      message: `Subcategories fetched successfully for ${category.categoryName}`,
      data: subcategories
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllSubSubCategories = async (req, res) => {
  try {
    const { categoryID, subcategoryID } = req.params;
    const category = await Category.findOne(
      {
        _id: categoryID,
        'subcategories._id': subcategoryID
      },
      {
        'subcategories.$': 1
      }
    );
    if (!category || !category.subcategories || category.subcategories.length === 0) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    const subSubcategories = category.subcategories[0].subSubcategories;
    res.status(200).json({
      status: 200,
      success: true,
      message: "Subsubcategory Data fetched successfully",
      data: subSubcategories
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deletecategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      status:200,
      message: "Deleted sucessfully",
      data: category
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteSubCategory = async (req, res) => {
  try {
    const { id, categoryName } = req.params;
    const category = await Category.findOne({ categoryName: categoryName });

    if (!category)
      return res.status(404).json({ message: 'Category not found' });

    category.subcategories = category.subcategories.filter(subcategory => subcategory._id.toString() !== id);

    await category.save();

    res.status(200).json({ 
      status: 200,
      success: true,
      data:category,
      message: 'Subcategory deleted successfully'
     });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubSubCategory = async (req, res) => {
  try {
    const { id, categoryName, subSubcategoryName } = req.params;

    const category = await Category.findOne({ categoryName });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    const subcategory = category.subcategories.find(
      (subcat) => subcat.subcategoryName === subSubcategoryName
    );

    if (!subcategory) {
      return res.status(404).json({
        message: 'Subcategory not found',
      });
    }

    const subSubcategoryIndex = subcategory.subSubcategories.findIndex(
      (subSubcat) => subSubcat._id.toString() === id
    );

    if (subSubcategoryIndex === -1) {
      return res.status(404).json({
        message: 'Sub-subcategory not found',
      });
    }

    subcategory.subSubcategories.splice(subSubcategoryIndex, 1);

    await category.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Sub-subcategory deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};


const getCategoryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const category = await Category.find({ categoryName: name });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({
      status:200,
      success: true,
      message: "Category fetched by name successfully",
      data:category
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateCategory = async (req, res) => {
  const { name, description, subcategories } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, subcategories },
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({
      status:200,
      success: true,
      message: "Updated",
      data:updatedCategory
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addCategory,
  addSubCategory,
  getAllProductCategories,
  getAllSubCategories,
  getAllSubSubCategories,
  getCategoryByName,
  updateCategory,
  addSubSubcategory,
  deletecategory,
  deleteSubCategory,
  getAllCategories,
  deleteSubSubCategory
}
