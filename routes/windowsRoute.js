const express = require('express');
const { createWindows } = require('../controllers/windowsProductControllers');

const router = express.Router();

router.post('/create',createWindows);
router.get('/',createWindows);

module.exports = router;