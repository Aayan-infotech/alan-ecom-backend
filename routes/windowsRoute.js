const express = require('express');
const { createWindows, getAllWindows, deleteWindows } = require('../controllers/windowsProductControllers');

const router = express.Router();

router.post('/create',createWindows);
router.get('/',getAllWindows);
router.delete('/delete/:id',deleteWindows);

module.exports = router;