const express = require('express');
const candidatesCantroller = require('../controllers/candidates.js');

const router = express.Router();

router.get('/', candidatesCantroller.getCandidates);
router.get('/:id', candidatesCantroller.getCandidateById);

module.exports = router;
