const async = require('async');
const connection = require('./connection.js').connection;
const tsFeedbackQueries = require('../queries/ts-feedback-queries.js');

function uniteGetResults(feedbacks, otherSkills) {
  return feedbacks.map((item) => {
    const cItem = item;
    cItem.other_skills = otherSkills[1][0];
    return cItem;
  });
}
function getTsFeedbacksByCandidateId(id, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(tsFeedbackQueries.getTsFeedbacksByCandidateId(id), (error, result) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      async.parallel(result.map(
        item => cb => connection.query(
          tsFeedbackQueries.getSecondarySkillsByTsFeedbackId(item.id), cb)),
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
            return undefined;
          });
          return callback(err, uniteGetResults(result, res));
        });
      return undefined;
    });
  });
}
function addTsFeedback(object, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(tsFeedbackQueries.addTsFeedback(object), (fError, fResult) => {
      if (fError) {
        return connection.rollback(() => {
          throw fError;
        });
      }
      const id = fResult.insertId;
      async.parallel(object.secondary_skills.map(
        item => cb => connection.query(tsFeedbackQueries.addTsSecondarySkills(item, id), cb)),
        (sError) => {
          if (sError) {
            return connection.rollback(() => {
              throw sError;
            });
          }
          connection.query(tsFeedbackQueries.addEventToGeneralHistory(id), (hError, hResult) => {
            if (hError) {
              return connection.rollback(() => {
                throw hError;
              });
            }
            connection.commit((commitError) => {
              if (commitError) {
                return connection.rollback(() => {
                  throw commitError;
                });
              }
              return undefined;
            });
            return callback(hError, hResult);
          });
          return undefined;
        });
      return undefined;
    });
  });
}

module.exports = {
  getTsFeedbacksByCandidateId,
  addTsFeedback,
};
