const express = require('express');
const { getAllCategories, addSubCategory, deleteSubCategory, addSubSubcategory, deleteSubSubCategory, addCategory, deletecategory } = require('../controllers/CategoryControllers');

const router = express.Router();

router.post('/addcategory', addCategory);
router.post('/addsubcategory', addSubCategory);
router.post('/addsubsubcategory', addSubSubcategory);
router.get('/', getAllCategories);
router.delete('/delete-category/:id', deletecategory);
router.delete('/delete-subcategory/:categoryName/:id', deleteSubCategory);
router.delete('/delete-subsubcategory/:categoryName/:subSubcategoryName/:id', deleteSubSubCategory);

module.exports = router;