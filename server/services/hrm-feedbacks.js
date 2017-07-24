const hrmFeedbackDao = require('../dao/hrm-feedbacks.js');
const convertKeys = require('./convert-keys.js');

function toCamel(arr) {
  return arr.map(item => convertKeys.toCamel(item));
}

function getById(id, callback) {
  hrmFeedbackDao.getById(id, (err, res) => {
    if (err) {
      throw err;
    }
    callback(err, toCamel(res));
  });
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
  getById,
  getByCandidateId,
  insert,
};
