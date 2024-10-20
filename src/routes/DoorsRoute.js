const express = require('express');
const {createDoorss, allDoorsProduct, deleteDoorsProduct } = require('../controllers/doorsProductController');

const router = express.Router();

router.post('/add-doors', createDoorss);
router.get('/', allDoorsProduct);
router.delete('/delete-door/:id', deleteDoorsProduct);

module.exports = router;