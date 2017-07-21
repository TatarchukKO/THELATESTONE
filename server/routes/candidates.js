const express = require('express');
const candidatesCantroller = require('../controllers/candidates.js');
const validate = require('express-validation');
const validation = require('../validation/candidates.js');

const router = express.Router();

router.use((req, res, next) => {
  if (req.user.type === 'TECH') {
    res.status(403).send();
  } else {
    next();
  }
});
router.put('/', validate(validation.get), candidatesCantroller.get);
router.get('/trie-search', validate(validation.trieSearch), candidatesCantroller.trieSearch);
router.get('/search/', validate(validation.search), candidatesCantroller.search);
router.get('/:id', validate(validation.getById), candidatesCantroller.getById);
router.post('/new', validate(validation.insert), candidatesCantroller.insert);
router.patch('/edit/:id', validate(validation.update), candidatesCantroller.update);

module.exports = router;
