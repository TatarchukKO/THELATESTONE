const express = require('express');
const notificationController = require('../controllers/notification.js');

const router = express.Router();

router.get('/upcoming-interviews', notificationController.getUpcomingInterviews);

module.exports = router;
