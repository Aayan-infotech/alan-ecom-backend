const express = require('express');
const {createDoorss, allDoorsProduct, deleteDoorsProduct, updateDoorsProduct} = require('../controllers/doorsProductController');

const router = express.Router();

router.post('/add-doors', createDoorss);
router.get('/', allDoorsProduct);
router.delete('/delete-door/:id', deleteDoorsProduct);
router.put('/update-door/:id', updateDoorsProduct);

module.exports = router;