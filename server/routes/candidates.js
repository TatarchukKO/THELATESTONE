const express = require('express');
const candidatesCantroller = require('../controllers/candidates.js');

const router = express.Router();

router.use((req, res, next) => {
  if (req.user.type === 'TECH') {
    res.status(403).send();
  } else {
    next();
  }
});
router.put('/', candidatesCantroller.get);
router.get('/trie-search', candidatesCantroller.trieSearch);
router.get('/:id', candidatesCantroller.getById);
router.post('/new', candidatesCantroller.insert);
router.patch('/edit/:id', candidatesCantroller.update);
router.put('/search/', candidatesCantroller.search);

module.exports = router;
