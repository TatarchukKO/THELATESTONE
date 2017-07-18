const express = require('express');
const tsFeedbackController = require('../controllers/ts-feedbacks.js');

const router = express.Router();

router.get('/:id', tsFeedbackController.getTsFeedbacksByCandidateId);
router.post('/new', tsFeedbackController.addTsFeedback);

module.exports = router;
