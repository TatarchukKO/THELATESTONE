const tsFeedbackDao = require('../dao/ts-feedbacks.js');
const convertKeys = require('convert-keys');

function toCamel(obj) {
  return obj.map(item => convertKeys.toCamel(item));
}

function getByCandidateId(id, callback) {
  tsFeedbackDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    callback(err, toCamel(res));
  });
}
function insert(object, callback) {
  tsFeedbackDao.insert(convertKeys.toSnake(object), callback);
}

module.exports = {
  getByCandidateId,
  insert,
};
