const express = require('express');
const { createEntryDoor, getAllEntryDoors, getEntryDoorsById, deleteEntryDoors, updateEntryDoors, addDimensions } = require('../controllers/entryDoorController');

const router = express.Router();

router.post("/create",createEntryDoor);
router.get("/",getAllEntryDoors);
router.get("/getProductById/:id",getEntryDoorsById);
router.delete("/delete/:id",deleteEntryDoors);
router.put("/update/:id",updateEntryDoors);
router.put("/add-dimensions/:id",addDimensions);

module.exports = router;