const express = require('express');
const hrmFeedbackController = require('../controllers/hrm-feedbacks.js');
const validate = require('express-validation');
const validation = require('../validation/hrm-feedbacks.js');

const router = express.Router();

router.post('/new', validate(validation.insert), hrmFeedbackController.insert);
router.get('/detailed-view', validate(validation.getById), hrmFeedbackController.getById);
router.get('/', validate(validation.getByCandidateId), hrmFeedbackController.getByCandidateId);

module.exports = router;
