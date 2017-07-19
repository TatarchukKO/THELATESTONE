const vacancyController = require('../controllers/vacancy.js');
const router = require('express').Router();

router.get('/', vacancyController.getVacancies);
router.get('/:id', vacancyController.getVacancy);
router.put('/:id', vacancyController.updateVacancy);
router.post('/', vacancyController.addVacancy);


module.exports = router;
