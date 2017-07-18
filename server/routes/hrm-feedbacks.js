const express = require('express');
const hrmFeedbackController = require('../controllers/hrm-feedbacks.js');

const router = express.Router();

router.get('/:id', hrmFeedbackController.getHrmFeedbacksByCandidateId);
router.post('/new', hrmFeedbackController.addHrmFeedback);

module.exports = router;

