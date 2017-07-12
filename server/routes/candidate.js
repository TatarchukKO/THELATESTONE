const express = require('express');
const candidateCantroller = require('../controllers/candidate.js');

const router = express.Router();

router.get('/', candidateCantroller.getCandidates);
router.get('/:id', candidateCantroller.getCandidateById);

module.exports = router;
