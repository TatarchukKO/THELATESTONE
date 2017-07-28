const vacancyController = require('../controllers/vacancy.js');
const router = require('express').Router();
const validate = require('express-validation');
const validation = require('../validation/vacancies.js');

router.use((req, res, next) => {
  if (req.user.type === 'TECH') {
    res.status(403).send();
  } else {
    next();
  }
});

router.post('/', validate(validation.getVacancies), vacancyController.getVacancies);
router.get('/:id', validate(validation.getVacancy), vacancyController.getVacancy);
router.patch('/:id', validate(validation.updateVacancy), vacancyController.updateVacancy);
router.post('/new', validate(validation.addVacancy), vacancyController.addVacancy);
router.get('/:id/candidates/', validate(validation.getCandidates), vacancyController.getCandidates);
router.get('/:id/assigned', validate(validation.getAssignedCandidates), vacancyController.getAssignedCandidates);

module.exports = router;
