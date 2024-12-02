const express = require('express');
const { createSlidingDoor, getAllSlidingDoors, getProductById, deleteSlidingDoors, updateSlidingDoors, addDimensions, getProduct } = require('../controllers/slidingDoorsController');
const router = express.Router();

router.post('/create', createSlidingDoor);
router.get('/', getAllSlidingDoors);
router.get('/getbyid/:id', getProductById);
router.delete('/delete/:id', deleteSlidingDoors);
router.put('/update/:id', updateSlidingDoors);
router.put('/add-dimensions/:id', addDimensions);
router.get('/getProduct/:id', getProduct);

module.exports = router;