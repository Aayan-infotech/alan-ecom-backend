const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubSubcategorySchema = new Schema({
  subSubcategoryName: { // Change this to subSubcategoryName
    type: String,
    required: false // Make this required if you want to enforce it
  }
});

const SubcategorySchema = new Schema({
  subcategoryName: {
    type: String,
    required: false // Also make this required
  },
  subSubcategories: [SubSubcategorySchema]
});

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  subcategories: [SubcategorySchema]
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
