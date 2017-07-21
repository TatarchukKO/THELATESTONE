const express = require('express');
const interviewController = require('../controllers/interviews.js');

const router = express.Router();

router.post('/new', interviewController.insert);
router.get('/user/:id', interviewController.getByUserId);
router.get('/candidate/:id', interviewController.getByCandidateId);

module.exports = router;
