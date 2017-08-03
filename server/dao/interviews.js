const async = require('async');

const connection = require('./connection').connection;
const interviewQueries = require('../queries/interview-queries');

function insertInterview(object, cb) {
  connection.query(interviewQueries.insert(object), (err, res) => {
    if (err) {
      throw err;
    }
    cb(null, res.insertId);
  });
}
function insertEventToGeneralHistory(id, cb) {
  connection.query(interviewQueries.insertEventToGeneralHistory(id), (err) => {
    if (err) {
      throw err;
    }
    cb(null, id);
  });
}

function insert(object, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    async
      .waterfall([
        async.apply(insertInterview, object),
        insertEventToGeneralHistory,
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
function getByUserId(id, callback) {
  connection.query(interviewQueries.getByUserId(id), callback);
}
function getByCandidateId(id, callback) {
  connection.query(interviewQueries.getByCandidateId(id), callback);
}
function getEmailNotificationData(id, callback) {
  connection.query(interviewQueries.getEmailNotificationData(id), callback);
}
function getUserId(id, callback) {
  connection.query(interviewQueries.getUserId(id), callback);
}

module.exports = {
  getUserId,
  insert,
  getByUserId,
  getByCandidateId,
  getEmailNotificationData,
};
