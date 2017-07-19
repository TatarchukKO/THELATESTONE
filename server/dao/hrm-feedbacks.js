const connection = require('./connection.js').connection;
const hrmFeedbackQueries = require('../queries/hrm-feedback-queries.js');

function getHrmFeedbacksByCandidateId(id, callback) {
  connection.query(hrmFeedbackQueries.getHrmFeedbacksByIdQuery(id), callback);
}
function addHrmFeedback(object, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(hrmFeedbackQueries.addHrmFeedbackQuery(object), (error, result) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      const id = result.insertId;
      connection.query(hrmFeedbackQueries.addEventToGeneralHistory(id), (err, res) => {
        if (err) {
          return connection.rollback(() => {
            throw err;
          });
        }
        connection.commit((commitError) => {
          if (commitError) {
            return connection.rollback(() => {
              throw commitError;
            });
          }
        });
        return callback(err, res);
      });
    });
  });
}

module.exports = {
  getHrmFeedbacksByCandidateId,
  addHrmFeedback,
};
