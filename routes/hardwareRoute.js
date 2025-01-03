const express = require('express');
const { createHardware, getHardwareProduct, getHardwarePoductById, deleteHardwareProduct, updateHardwareProduct, addDimensions, getProduct } = require('../controllers/hardwareContrroller');

const router = express.Router();

router.post("/create", createHardware);
router.get("/", getHardwareProduct);
router.get("/getbyid/:id", getHardwarePoductById);
router.delete("/delete/:id", deleteHardwareProduct);
router.put("/update/:id", updateHardwareProduct);
router.put("/addDimensions/:id", addDimensions);
router.get("/getProduct/:id", getProduct);

module.exports = router;