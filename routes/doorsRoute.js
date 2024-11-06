const express = require('express');
const {createDoorss, allDoorsProduct, deleteDoorsProduct, updateDoorsProduct, addDimensions} = require('../controllers/doorsProductController');

const router = express.Router();

router.post('/add-doors', createDoorss);
router.post('/add-dimensions/:id', addDimensions);
router.get('/', allDoorsProduct);
router.delete('/delete-door/:id', deleteDoorsProduct);
router.put('/update-door/:id', updateDoorsProduct);

module.exports = router;