const interviewDao = require('../dao/interviews.js');
const convertKeys = require('./convert-keys.js');
const gmail = require('../notification/gmail.js');
const utils = require('../../utils.js');

function editAndSendMail(obj) {
  const camelRes = convertKeys.toCamel(obj);
  const resp = utils.editNames(camelRes);
  utils.formatDate(resp);
  gmail.sendMail(resp[0]);
}

function insert(object, callback) {
  utils.formatDate(object);
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
    let result = convertKeys.toCamel(res);
    result = utils.formatDates(result);
    callback(err, utils.editNames(result));
  });
}
function getByCandidateId(id, callback) {
  interviewDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    let result = convertKeys.toCamel(res);
    result = utils.formatDates(result);
    callback(err, utils.editNames(result));
  });
}

module.exports = {
  insert,
  getByUserId,
  getByCandidateId,
};
