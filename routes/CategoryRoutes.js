const express = require('express');
const { createCategory, getAllCategories, addSubSubcategory } = require('../controllers/CategoryControllers');

const router = express.Router();

router.post('/addsubcategory', createCategory);
router.post('/addsubsubcategory', addSubSubcategory);
router.get('/', getAllCategories);

module.exports = router;