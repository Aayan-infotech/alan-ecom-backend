const express = require('express');
const { createBiFoldDoor, getAllBiFoldDoors, getProductById, updateBiFoldDoors, deleteBiFoldDoors, addDimensions, getProduct } = require('../controllers/biFoldDoorController');
const router = express.Router();

router.post("/create",createBiFoldDoor);
router.get("/",getAllBiFoldDoors);
router.get("/getbyid/:id",getProductById);
router.put("/update/:id",updateBiFoldDoors);
router.delete("/delete/:id",deleteBiFoldDoors);
router.put("/add-dimensions/:id",addDimensions);
router.get("/getProduct/:id",getProduct);

module.exports = router;