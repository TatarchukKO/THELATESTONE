const controller = require('../controllers/general-history');
const router = require('express').Router();
const validate = require('express-validation');
const validation = require('../validation/general-history');

router.use((req, res, next) => {
  if (req.user.type === 'admin') {
    next();
  } else {
    res.status(403).send();
  }
});

router.get('/', validate(validation.getHistory), controller.getHistory);

module.exports = router;
