const interviewDao = require('../dao/interviews.js');
const convertKeys = require('./convert-keys.js');
const dateFormat = require('dateformat');

function isEngName(obj) {
  if (obj.ruFirstName || obj.ruSecondName) {
    return false;
  }
  return true;
}
function editCandidateName(obj) {
  if (isEngName(obj)) {
    delete obj.ruFirstName;
    delete obj.ruSecondName;
  } else {
    delete obj.engFirstName;
    delete obj.engSecondName;
  }
  return obj;
}
function editCandidatesNames(arr) {
  return arr.map(item => editCandidateName(item));
}
function toCamel(arr) {
  return arr.map(item => convertKeys.toCamel(item));
}
function formatDate(object) {
  object.date = dateFormat(object.date, 'yyyy-dd-mm HH:MM:ss');
}

function insert(object, callback) {
  formatDate(object);
  interviewDao.insert(convertKeys.toSnake(object), callback);
}
function getByUserId(id, callback) {
  interviewDao.getByUserId(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = toCamel(res);
    callback(err, editCandidatesNames(result));
  });
}
function getByCandidateId(id, callback) {
  interviewDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = toCamel(res);
    callback(err, editCandidatesNames(result));
  });
}

module.exports = {
  insert,
  getByUserId,
  getByCandidateId,
};
