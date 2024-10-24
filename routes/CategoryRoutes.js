const express = require('express');
const { getAllCategories, createSubCategory, deleteSubCategory, addSubSubcategory, deleteSubSubCategory } = require('../controllers/CategoryControllers');

const router = express.Router();

router.post('/addsubcategory', createSubCategory);
router.post('/addsubsubcategory', addSubSubcategory);
router.get('/', getAllCategories);
router.delete('/delete-subcategory/:categoryName/:id', deleteSubCategory);
router.delete('/delete-subsubcategory/:categoryName/:subSubcategoryName/:id', deleteSubSubCategory);

module.exports = router;