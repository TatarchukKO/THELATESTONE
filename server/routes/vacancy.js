const controller = require('../controllers/vacancy.js');
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

router.post('/', validate(validation.getVacancies), controller.getVacancies);
router.get('/:id', validate(validation.getVacancy), controller.getVacancy);
router.patch('/update/:id', validate(validation.updateVacancy), controller.updateVacancy);
router.post('/new', validate(validation.addVacancy), controller.addVacancy);
router.get('/:id/candidates', validate(validation.getCandidates), controller.getCandidates);
router.get('/:id/assigned', validate(validation.getAssigned), controller.getAssigned);
router.patch('/close', controller.closeVacancy);


module.exports = router;
