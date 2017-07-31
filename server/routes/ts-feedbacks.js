const express = require('express');
const tsFeedbackController = require('../controllers/ts-feedbacks.js');
const validate = require('express-validation');
const validation = require('../validation/ts-feedbacks.js');

const router = express.Router();

router.post('/new', validate(validation.insert), tsFeedbackController.insert);
router.get('/detailed-view', validate(validation.getById), tsFeedbackController.getById);
router.get('/', validate(validation.getByCandidateId), tsFeedbackController.getByCandidateId);

module.exports = router;
