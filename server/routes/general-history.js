const controller = require('../controllers/general-history');
const router = require('express').Router();

router.use((req, res, next) => {
  if (req.user.type === 'admin') {
    next();
  } else {
    res.status(403).send();
  }
});

router.get('/', controller.getHistory);

module.exports = router;
