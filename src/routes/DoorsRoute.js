const express = require('express');
const {createDoorss } = require('../controllers/doorsProductController');

const router = express.Router();

router.post('/add-doors', createDoorss);

module.exports = router;