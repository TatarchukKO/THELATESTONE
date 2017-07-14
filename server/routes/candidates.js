const express = require('express');
const candidatesCantroller = require('../controllers/candidates.js');

const router = express.Router();

router.get('/all/:skip', candidatesCantroller.get);
router.get('/:id', candidatesCantroller.getById);
router.post('/new', candidatesCantroller.insert);
router.patch('/edit/:id', candidatesCantroller.update);

module.exports = router;
