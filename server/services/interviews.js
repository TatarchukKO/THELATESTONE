const interviewDao = require('../dao/interviews');
const gmail = require('../notification/gmail');
const utils = require('../../utils');

function editDoneField(obj) {
  if (obj.done) {
    obj.done = 'Closed';
  } else {
    obj.done = 'Open';
  }
  return obj;
}

function editDoneFields(arr) {
  return arr.map(item => editDoneField(item));
}

function editAndSendMail(obj) {
  const camelRes = utils.toCamel(obj);
  const resp = utils.namesEditor.editArr(camelRes);
  utils.formatDate(resp);
  gmail.sendMail(resp[0]);
}

function insert(object, callback) {
  utils.formatDate(object);
  interviewDao.insert(utils.toSnake(object), (error, result) => {
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
  const currentTime = utils.dateFormatter.format(new Date(), 'yyyy-mm-dd HH:MM:ss');
  interviewDao.getByUserId(id, currentTime, (err, res) => {
    if (err) {
      throw err;
    }
    let result = utils.toCamel(res);
    result = utils.formatDates(result);
    callback(err, utils.namesEditor.editArr(result));
  });
}

function getByCandidateId(id, callback) {
  interviewDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    let result = utils.toCamel(res);
    result = utils.formatDates(result);
    result = editDoneFields(result);
    callback(err, utils.namesEditor.editArr(result));
  });
}

module.exports = {
  insert,
  getByUserId,
  getByCandidateId,
};
