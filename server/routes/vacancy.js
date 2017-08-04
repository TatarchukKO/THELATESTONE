const controller = require('../controllers/vacancy');
const router = require('express').Router();
const validate = require('express-validation');
const validation = require('../validation/vacancies');

router.use((req, res, next) => {
  if (req.user.type === 'TECH') {
    res.status(403).send();
  } else {
    next();
  }
});

router.post('/', validate(validation.getVacancies), controller.getVacancies);
router.get('/:id', validate(validation.getVacancy), controller.getVacancy);
router.patch('/:id/update', validate(validation.updateVacancy), controller.updateVacancy);
router.post('/new', validate(validation.addVacancy), controller.addVacancy);
router.get('/:id/candidates', validate(validation.getCandidates), controller.getCandidates);
router.get('/:id/assigned', validate(validation.getAssigned), controller.getAssigned);
router.patch('/close', validate(validation.closeVacancy), controller.closeVacancy);
router.get('/:id/history', validate(validation.getHistory), controller.getHistory);
router.get('/:id/hiring', validate(validation.getHiringList), controller.getHiringList);


module.exports = router;
