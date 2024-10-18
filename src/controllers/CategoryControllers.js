// controllers/categoryController.js

const Category = require('../models/CategoryModel');

const createCategory = async (req, res) => {
  try {
    const { categoryName, subcategoryName } = req.body;

    // Validate the input
    if (!categoryName || !subcategoryName) {
        return res.status(400).json({ message: "Category name and subcategory name are required." });
    }

    // Ensure category name is either "Doors" or "Windows"
    if (!['Doors', 'Windows'].includes(categoryName)) {
        return res.status(400).json({ message: 'Category name must be either "Doors" or "Windows".' });
    }

    // Find the category by name
    let category = await Category.findOne({ categoryName });

    // If the category exists, add a new subcategory
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

    // Save the updated/created category
    const savedCategory = await category.save();
    return res.status(201).json(savedCategory); // Send the saved data back
} catch (error) {
    console.error('Error adding/updating category:', error);
    return res.status(500).json({ message: 'Error adding/updating category', error });
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


const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(204).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addSubcategory = async (req, res) => {
  const { subcategory } = req.body;

  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.subcategories.push(subcategory);
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const addSubSubcategory = async (req, res) => {
  try {
    const { categoryName, subcategoryName, subSubcategoryName } = req.body;

    if (!['Doors', 'Windows'].includes(categoryName)) {
      return res.status(400).json({ message: 'Category name must be either "Doors" or "Windows".' });
    }

    let category = await Category.findOne({ categoryName });
    console.log(category)

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    let subcategory = category.subcategories.find(sub => sub.subcategoryName === subcategoryName);
    console.log(subcategory)
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    if (subSubcategoryName && subSubcategoryName.trim() !== '') {
      subcategory.subSubcategories.push({ subSubcategoryName });
    } else {
      return res.status(400).json({ message: 'Sub-subcategory name cannot be empty.' });
    }

    console.log("updateded:",subcategory)

    const updatedCategory = await category.save();

    res.status(200).json({ message: 'Sub-Subcategory added successfully', updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error adding sub-subcategory', error });
  }
};






module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    addSubcategory,
    addSubSubcategory
}
