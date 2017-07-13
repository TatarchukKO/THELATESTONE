const express = require('express');
const candidatesCantroller = require('../controllers/candidates.js');

const router = express.Router();

router.get('/', candidatesCantroller.get);
router.get('/:id', candidatesCantroller.getById);
router.post('/new', candidatesCantroller.insert);

module.exports = router;
