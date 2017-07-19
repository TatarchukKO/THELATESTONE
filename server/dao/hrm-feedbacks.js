const connection = require('./connection.js').connection;
const hrmFeedbackQueries = require('../queries/hrm-feedback-queries.js');

function getByCandidateId(id, callback) {
  connection.query(hrmFeedbackQueries.getByCandidateId(id), callback);
}
function insert(object, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(hrmFeedbackQueries.insert(object), (error, result) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      const id = result.insertId;
      connection.query(hrmFeedbackQueries.insertEventToGeneralHistory(id), (err, res) => {
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
  getByCandidateId,
  insert,
};
