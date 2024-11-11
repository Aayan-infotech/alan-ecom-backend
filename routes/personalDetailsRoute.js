const express = require('express');
const { createPersonalDetails, getAllPersonalDetails, getPersonalDetailsById, deletePersonalDetailsById } = require('../controllers/personalDetailsController');

const router = express.Router();

router.post('/create', createPersonalDetails);
router.get('/', getAllPersonalDetails);
router.get('/getPersonalDetailsById/:id', getPersonalDetailsById);
router.delete('/delete/:id', deletePersonalDetailsById);

module.exports = router;