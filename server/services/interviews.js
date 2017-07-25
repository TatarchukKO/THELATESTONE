const interviewDao = require('../dao/interviews.js');
const convertKeys = require('./convert-keys.js');
const dateFormat = require('dateformat');
const gmail = require('../notification/gmail.js');

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
  object.date = dateFormat(object.date, 'yyyy-mm-dd HH:MM:ss');
}
function editAndSendMail(obj) {
  const camelRes = convertKeys.toCamel(obj);
  const resp = editCandidatesNames(camelRes);
  formatDate(resp);
  gmail.sendMail(resp[0]);
}

function insert(object, callback) {
  formatDate(object);
  interviewDao.insert(convertKeys.toSnake(object), (error, result) => {
    if (error) {
      throw error;
    }
    interviewDao.getEmailNotificationData(result,
      (err, res) => {
        editAndSendMail(res);
        callback(err);
      });
  });
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
