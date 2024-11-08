const express = require('express');
const { createEstimate, getAllEstimates, getEstimateById, deleteEstimateById } = require('../controllers/estimateController');

const router = express.Router();

router.post('/create',createEstimate);
router.get('/',getAllEstimates);
router.get('/getEstimateById/:id',getEstimateById);
router.delete('/delete/:id',deleteEstimateById);

module.exports = router;