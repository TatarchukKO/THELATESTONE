const connection = require('./connection').connection;
const notificationQueries = require('../queries/notification-queries');

function getUpcomingInterviews(id, currentTime, timeLimit, callback) {
  connection
    .query(notificationQueries.getUpcomingInterviews(id, currentTime, timeLimit),
    (err, res) => {
      if (err) {
        throw err;
      }
      callback(err, res);
    });
}

module.exports = {
  getUpcomingInterviews,
};
