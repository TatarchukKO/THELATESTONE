const async = require('async');
const connection = require('./connection.js').connection;
const tsFeedbackQueries = require('../queries/ts-feedback-queries.js');

function uniteResults(feedbacks, otherSkills) {
  return feedbacks.map((item) => {
    const cItem = item;
    cItem.other_skills = otherSkills[0][0];
    return cItem;
  });
}
function insertFeedback(object, cb) {
  connection.query(tsFeedbackQueries.insert(object), (err, res) => {
    if (err) {
      throw err;
    }
    cb(null, object, res.insertId);
  });
}
function insertSecondarySkills(object, id, cb) {
  async.parallel(object.secondary_skills.map(
    item => callback =>
      connection.query(tsFeedbackQueries
        .insertTsSecondarySkills(item, id),
        callback)),
    (pError) => {
      if (pError) {
        throw pError;
      }
      cb(null, id);
    });
}
function insertEventToGeneralHistory(id, cb) {
  connection.query(tsFeedbackQueries.insertEventToGeneralHistory(id), (err) => {
    if (err) {
      throw err;
    }
    cb(null);
  });
}
function updateInterviewStatus(object, cb) {
  connection
    .query(tsFeedbackQueries.updateInterviewStatus(object),
    (err) => {
      if (err) {
        throw err;
      }
      cb(null);
    });
}

function getById(id, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(tsFeedbackQueries.getById(id), (error, result) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      async
        .parallel(result
          .map(item => cb => connection.query(tsFeedbackQueries.getSecondarySkillsByTsFeedbackId(item.id), cb)),
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
            callback(err, uniteResults(result, res));
          });
        });
    });
  });
}
function getByCandidateId(id, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(tsFeedbackQueries.getByCandidateId(id), (error, result) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      /* async.parallel(result.map(
        item => cb => connection.query(tsFeedbackQueries.getSecondarySkillsByTsFeedbackId(item.id), (e, r) => {
          if (e) {
            return connection.rollback(() => {
              throw e;
            });
          }
          cb(e, r);
        })),
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
          });
          callback(err, uniteResults(result, res));
        });*/
      connection.commit((commitError) => {
        if (commitError) {
          return connection.rollback(() => {
            throw commitError;
          });
        }
        callback(error, result);
      });
    });
  });
}
function insert(object, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    async
      .waterfall([
        async.apply(insertFeedback, object),
        insertSecondarySkills,
        insertEventToGeneralHistory,
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
