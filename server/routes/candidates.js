const express = require('express');
const validate = require('express-validation');

const candidatesCantroller = require('../controllers/candidates');
const validation = require('../validation/candidates');
const json2xls = require('json2xls');

const router = express.Router();

router.post('/', validate(validation.get), candidatesCantroller.get);
router.get('/trie-search', validate(validation.trieSearch), candidatesCantroller.trieSearch);
router.post('/search', validate(validation.search), candidatesCantroller.search);
router.get('', validate(validation.getById), candidatesCantroller.getById);
router.post('/new', validate(validation.insert), candidatesCantroller.insert);
router.patch('/edit', validate(validation.update), candidatesCantroller.update);
router.post('/report', validate(validation.report), json2xls.middleware, candidatesCantroller.report);

module.exports = router;
