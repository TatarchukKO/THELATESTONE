const notificationService = require('../services/notification');

function getUpcomingInterviews(req, res) {
  notificationService.getUpcomingInterviews(2, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    res.status(200).send(result);
  });
}

module.exports = {
  getUpcomingInterviews,
};
