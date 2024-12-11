const express = require('express');
const { getAllEntryDoorsById, createEntryDoor, getAllEntryDoors, getEntryDoorsById, deleteEntryDoors, updateEntryDoors, addDimensions, getProduct } = require('../controllers/entryDoorController');

const router = express.Router();

router.post("/create",createEntryDoor);
router.get("/",getAllEntryDoors);
router.get("/getAllEntryDoorsById/:id",getAllEntryDoorsById);
router.get("/getProductById/:id",getEntryDoorsById);
router.delete("/delete/:id",deleteEntryDoors);
router.put("/update/:id",updateEntryDoors);
router.put("/add-dimensions/:id",addDimensions);
router.get("/getProduct/:id",getProduct);

module.exports = router;