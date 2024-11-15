const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubSubcategorySchema = new Schema({
  subSubcategoryName: {
    type: String,
    required: false 
  },
  image: {
    type: String,
    required: false 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const SubcategorySchema = new Schema({
  subcategoryName: {
    type: String,
    required: false 
  },
  image: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subSubcategories: [SubSubcategorySchema]
});

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subcategories: [SubcategorySchema]
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
