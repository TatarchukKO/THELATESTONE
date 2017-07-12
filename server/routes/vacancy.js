const express = require('express');
const vacancyController = require('../controllers/vacancy.js');

const router = express.Router();

router.get('/', vacancyController.getVacancies);

module.exports = router;
