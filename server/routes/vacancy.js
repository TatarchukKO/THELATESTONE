const vacancyController = require('../controllers/vacancy.js');
const router = require('express').Router();

router.use((req, res, next) => {
  if (req.user.type === 'TECH') {
    res.status(403).send();
  } else {
    next();
  }
});

router.put('/', vacancyController.getVacancies);
router.get('/:id', vacancyController.getVacancy);
router.put('/:id', vacancyController.updateVacancy);
router.post('/', vacancyController.addVacancy);

module.exports = router;
