const express = require('express');
const { createWindows, getAllWindows, deleteWindows, updateWindowsProduct, addDimensions } = require('../controllers/windowsProductControllers');

const router = express.Router();

router.post('/create',createWindows);
router.post('/add-dimensions/:id',addDimensions);
router.get('/',getAllWindows);
router.delete('/delete/:id',deleteWindows);
router.put('/update/:id',updateWindowsProduct);

module.exports = router;