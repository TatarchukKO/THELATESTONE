const express = require('express');
const tsFeedbackController = require('../controllers/ts-feedbacks.js');

const router = express.Router();

router.get('/:id', tsFeedbackController.getByCandidateId);
router.post('/new', tsFeedbackController.insert);

module.exports = router;
