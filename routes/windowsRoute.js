const express = require('express');
const upload = require('../middleware/upload');
const { createWindows, getAllWindows, deleteWindows, updateWindowsProduct, addDimensions, getDimensions } = require('../controllers/windowsProductControllers');

const router = express.Router();

router.post('/create', createWindows);
router.put('/add-dimensions/:id',addDimensions);
router.get('/',getAllWindows);
router.delete('/delete/:id',deleteWindows);
router.put('/update/:id',updateWindowsProduct);
router.get('/getdimensions/:id',getDimensions);

module.exports = router;