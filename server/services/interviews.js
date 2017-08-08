const calendar = require('../notification/calendar.js');
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
  const tz = resp[0].date.getTimezoneOffset();
  utils.dateFormatter.format(resp);
  resp[0].date = resp[0].date.getTime() + (tz * 60 * 1000);
  resp[0].date = new Date(resp[0].date);
  gmail.sendMail(resp[0]);
}

function insertEventInGoogleCalendar(obj) {
  const camelRes = utils.toCamel(obj);
  const tz = camelRes[0].date.getTimezoneOffset();
  const event = {};
  camelRes[0].date = camelRes[0].date.getTime() + (tz * 60 * 1000);
  camelRes[0].date = new Date(camelRes[0].date);
  event.date = camelRes[0].date;
  console.log(event.date);
  calendar.setCalendarId(camelRes[0].login);
  calendar.setStaticEvent(event);
  calendar.insertEventInGoogleCal();
}

function insert(object, callback) {
  utils.dateFormatter.format(object);
  console.log(object.date);
  interviewDao.insert(utils.toSnake(object), (error, result) => {
    if (error) {
      throw error;
    }
    interviewDao.getEmailNotificationData(result,
      (err, res) => {
        editAndSendMail(res);
        insertEventInGoogleCalendar(res);
        callback(err);
      });
  });
}

function getByUserId(id, callback) {
  interviewDao.getByUserId(id, (err, res) => {
    if (err) {
      throw err;
    }
    let result = utils.toCamel(res);
    result = utils.dateFormatter.formatArr(result);
    callback(err, utils.namesEditor.editArr(result));
  });
}

function getByCandidateId(id, callback) {
  interviewDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    let result = utils.toCamel(res);
    result = utils.dateFormatter.formatArr(result);
    result = editDoneFields(result);
    console.log(result);
    callback(err, utils.namesEditor.editArr(result));
  });
}

function getUserId(id, callback) {
  interviewDao.getUserId(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = utils.toCamel(res);
    callback(err, result[0].userId);
  });
}

function getUnclosedByUserId(id, callback) {
  interviewDao.getUnclosedByUserId(id, (err, res) => {
    if (err) {
      throw err;
    }
    let result = utils.toCamel(res);
    result = utils.dateFormatter.formatArr(result);
    result = editDoneFields(result);
    callback(err, utils.namesEditor.editArr(result));
  });
}

function getById(id, callback) {
  interviewDao.getById(id, (err, res) => {
    if (err) {
      throw err;
    }
    res = utils.toCamel(res);
    utils.dateFormatter.format(res);
    editDoneField(res);
    utils.namesEditor.edit(res);
    delete res.vacancyId;
    callback(err, res);
  });
}

module.exports = {
  getById,
  getUserId,
  insert,
  getByUserId,
  getByCandidateId,
  getUnclosedByUserId,
};
