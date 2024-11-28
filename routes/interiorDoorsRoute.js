const express = require('express');
const { createInteriorDoors, getAllInteriorDoors, getInteriorDoorsById, deleteInteriorDoors, updateInteriorDoors, addDimensions, getProduct } = require('../controllers/interiorDoorController');

const router = express.Router();

router.post('/create', createInteriorDoors);
router.get('/', getAllInteriorDoors);
router.get('/getbyid/:id', getInteriorDoorsById);
router.delete('/delete/:id', deleteInteriorDoors);
router.put('/update/:id', updateInteriorDoors);
router.put('/add-dimensions/:id', addDimensions);
router.get('/getProduct/:id', getProduct);

module.exports = router;