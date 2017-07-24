const hrmFeedbackDao = require('../dao/hrm-feedbacks.js');
const convertKeys = require('convert-keys');

function toCamel(obj) {
  return obj.map(item => convertKeys.toCamel(item));
}

function getByCandidateId(id, callback) {
  hrmFeedbackDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    callback(err, toCamel(res));
  });
}
function insert(object, callback) {
  hrmFeedbackDao.insert(convertKeys.toSnake(object), callback);
}

module.exports = {
  getByCandidateId,
  insert,
};
