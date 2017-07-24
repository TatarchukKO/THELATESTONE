const interviewDao = require('../dao/interviews.js');
const convertKeys = require('convert-keys');
const dateFormat = require('dateformat');

function toCamel(obj) {
  return obj.map(item => convertKeys.toCamel(item));
}
function formatDate(object) {
  object.date = dateFormat(object.date, 'yyyy-dd-mm HH:MM:ss');
}

function insert(object, callback) {
  formatDate(object);
  interviewDao.insert(object, callback);
}
function getByUserId(id, callback) {
  interviewDao.getByUserId(id, (err, res) => {
    if (err) {
      throw err;
    }
    callback(err, toCamel(res));
  });
}
function getByCandidateId(id, callback) {
  interviewDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    callback(err, toCamel(res));
  });
}

module.exports = {
  insert,
  getByUserId,
  getByCandidateId,
};
