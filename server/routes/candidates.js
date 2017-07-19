const express = require('express');
const candidatesCantroller = require('../controllers/candidates.js');

const router = express.Router();

/* router.use((req, res, next) => {
  if (req.user.type === 'TECH') {
    res.status(403).send();
  } else {
    next();
  }
}); */
router.put('/', candidatesCantroller.get);
router.get('/:id', candidatesCantroller.getById);
router.post('/new', candidatesCantroller.insert);
router.patch('/edit/:id', candidatesCantroller.update);

module.exports = router;
