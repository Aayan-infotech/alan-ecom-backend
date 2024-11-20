const express = require('express');
const { createWindows, getAllWindows, deleteWindows, updateWindowsProduct, addDimensions, getDimensions, getWindowByID } = require('../controllers/windowsProductControllers');

const router = express.Router();

router.post('/create', createWindows);
router.put('/add-dimensions/:id',addDimensions);
router.get('/',getAllWindows);
router.get('/getProduct/:id',getWindowByID);
router.delete('/delete/:id',deleteWindows);
router.put('/update/:id',updateWindowsProduct);
router.get('/getdimensions/:id',getDimensions);

module.exports = router;