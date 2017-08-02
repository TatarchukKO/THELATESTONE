const express = require('express');
const interviewController = require('../controllers/interviews.js');
const validate = require('express-validation');
const validation = require('../validation/interviews.js');


const router = express.Router();

router.post('/new', validate(validation.insert), interviewController.insert);
router.get('/user', validate(validation.getByUserId), interviewController.getByUserId);
router.get('/candidate', validate(validation.getByCandidateId), interviewController.getByCandidateId);

module.exports = router;
