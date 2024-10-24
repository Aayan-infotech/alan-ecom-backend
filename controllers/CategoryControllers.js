
const Category = require('../models/CategoryModel');

const createSubCategory = async (req, res) => {
  try {
    const { categoryName, subcategoryName } = req.body;

    if (!categoryName || !subcategoryName) {
      return res.status(400).json({ message: "Category name and subcategory name are required." });
    }

    if (!['Doors', 'Windows'].includes(categoryName)) {
      return res.status(400).json({ message: 'Category name must be either "Doors" or "Windows".' });
    }

    let category = await Category.findOne({ categoryName });

    if (category) {
      category.subcategories.push({
        subcategoryName
      });
    } else {
      category = new Category({
        categoryName,
        subcategories: [{
          subcategoryName
        }],
      });
    }

    const savedCategory = await category.save();
    return res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error adding/updating category:', error);
    return res.status(500).json({ message: 'Error adding/updating category', error });
  }
};

const addSubSubcategory = async (req, res) => {
  try {
    const { categoryName, subcategoryName, subSubcategoryName } = req.body;

    if (!['Doors', 'Windows'].includes(categoryName)) {
      return res.status(400).json({ message: 'Category name must be either "Doors" or "Windows".' });
    }

    let category = await Category.findOne({ categoryName });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    let subcategory = category.subcategories.find(sub => sub.subcategoryName === subcategoryName);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    if (subSubcategoryName && subSubcategoryName.trim() !== '') {
      subcategory.subSubcategories.push({ subSubcategoryName });
    } else {
      return res.status(400).json({ message: 'Sub-subcategory name cannot be empty.' });
    }

    const updatedCategory = await category.save();

    res.status(200).json({ message: 'Sub-Subcategory added successfully', updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error adding sub-subcategory', error });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id, categoryName } = req.params;
    const category = await Category.findOne({ categoryName: categoryName });

    if (!category)
      return res.status(404).json({ message: 'Category not found' });

    category.subcategories = category.subcategories.filter(subcategory => subcategory._id.toString() !== id);

    await category.save();

    res.status(200).json({ message: 'Subcategory deleted successfully' });
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
      message: 'Sub-subcategory deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
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
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSubCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteSubCategory,
  addSubSubcategory,
  deleteSubSubCategory
}
