const tsFeedbackDao = require('../dao/ts-feedbacks.js');
const convertKeys = require('./convert-keys.js');

function toCamel(arr) {
  return arr.map(item => convertKeys.toCamel(item));
}

function getById(id, callback) {
  tsFeedbackDao.getById(id, (err, res) => {
    if (err) {
      throw err;
    }
    callback(err, toCamel(res));
  });
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
  getById,
  getByCandidateId,
  insert,
};
