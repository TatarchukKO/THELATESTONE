const async = require('async');
const connection = require('./connection.js').connection;
const hrmFeedbackQueries = require('../queries/hrm-feedback-queries.js');

function insertFeedback(object, cb) {
  connection
    .query(hrmFeedbackQueries.insert(object),
    (err, res) => {
      if (err) {
        throw err;
      }
      cb(null, res.insertId, object.date);
    });
}

function insertEventToGeneralHistory(id, date, cb) {
  connection
    .query(hrmFeedbackQueries.insertEventToGeneralHistory(id, date),
    (err) => {
      if (err) {
        throw err;
      }
      cb(null);
    });
}
function insertFeedbackAndHistory(object, cb) {
  async
    .waterfall([
      async.apply(insertFeedback, object),
      insertEventToGeneralHistory,
    ],
    (err) => {
      if (err) {
        throw err;
      }
      cb(null);
    });
}
function updateInterviewStatus(object, cb) {
  connection
    .query(hrmFeedbackQueries.updateInterviewStatus(object.interview_id),
    (err) => {
      if (err) {
        throw err;
      }
      cb(null);
    });
}

function getById(id, callback) {
  connection.query(hrmFeedbackQueries.getById(id), callback);
}

function getByCandidateId(id, callback) {
  connection.query(hrmFeedbackQueries.getByCandidateId(id), callback);
}

function insert(object, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    async
      .parallel([
        async.apply(insertFeedbackAndHistory, object),
        async.apply(updateInterviewStatus, object),
      ],
      (err, res) => {
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
          callback(err, res);
        });
      });
  });
}

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
