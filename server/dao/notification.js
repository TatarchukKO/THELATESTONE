const connection = require('./connection.js').connection;
const notificationQueries = require('../queries/notification-queries.js');

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
