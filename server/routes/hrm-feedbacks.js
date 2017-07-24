const express = require('express');
const hrmFeedbackController = require('../controllers/hrm-feedbacks.js');

const router = express.Router();

router.get('/detailed-view', hrmFeedbackController.getById);
router.get('/:id', hrmFeedbackController.getByCandidateId);
router.post('/new', hrmFeedbackController.insert);

module.exports = router;
