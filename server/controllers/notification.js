const notificationService = require('../services/notification.js');

function getUpcomingInterviews(req, res) {
  notificationService.getUpcomingInterviews(2, (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(result);
  });
}

module.exports = {
  getUpcomingInterviews,
};
