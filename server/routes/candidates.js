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
router.post('/', validate(validation.get), candidatesCantroller.get);
router.get('/trie-search', validate(validation.trieSearch), candidatesCantroller.trieSearch);
router.post('/search', validate(validation.search), candidatesCantroller.search);
router.get('', validate(validation.getById), candidatesCantroller.getById);
router.post('/new', validate(validation.insert), candidatesCantroller.insert);
router.patch('/edit', validate(validation.update), candidatesCantroller.update);

module.exports = router;
