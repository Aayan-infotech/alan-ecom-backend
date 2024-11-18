const express = require('express');
const { getAllProductCategories, addSubCategory, deleteSubCategory, addSubSubcategory, deleteSubSubCategory, addCategory, deletecategory, getCategoryByName, getAllSubCategories, getAllSubSubCategories, getAllCategories } = require('../controllers/CategoryControllers');

const router = express.Router();

router.post('/addcategory', addCategory);
router.post('/addsubcategory', addSubCategory);
router.post('/addsubsubcategory', addSubSubcategory);
router.get('/getcategory/:name', getCategoryByName);
router.get('/getall', getAllProductCategories);
router.get('/', getAllCategories);
router.get('/get-subcategory/:id', getAllSubCategories)
router.get('/get-subsubcategory/category/:categoryID/subcategory/:subcategoryID', getAllSubSubCategories)
router.delete('/delete-category/:id', deletecategory);
router.delete('/delete-subcategory/:categoryName/:id', deleteSubCategory);
router.delete('/delete-subsubcategory/:categoryName/:subSubcategoryName/:id', deleteSubSubCategory);

module.exports = router;