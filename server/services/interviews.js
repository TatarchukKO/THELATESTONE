const dateFormat = require('dateformat');
const interviewDao = require('../dao/interviews.js');

function formatDate(object) {
  const newObj = object;
  newObj.date = dateFormat(object.date, 'yyyy-dd-mm HH:MM:ss');
  return newObj;
}
function isRuName(obj) {
  if (obj.ru_first_name && obj.ru_second_name) {
    return true;
  }
  return false;
}
function concatNames(result) {
  const res = result;
  for (let i = 0; i < res.length; i += 1) {
    if (isRuName(res[i])) {
      res[i].candidateName = `${res[i].ru_first_name} ${res[i].ru_second_name}`;
    } else {
      res[i].candidateName = `${res[i].eng_first_name} ${res[i].eng_second_name}`;
    }
    res[i].userName = `${res[i].first_name} ${res[i].second_name}`;
    delete res[i].eng_first_name;
    delete res[i].eng_second_name;
    delete res[i].ru_first_name;
    delete res[i].ru_second_name;
    delete res[i].first_name;
    delete res[i].second_name;
  }
}

function insert(object, callback) {
  interviewDao.insert(formatDate(object), callback);
}
function getByUserId(id, callback) {
  interviewDao.getByUserId(id, (err, res) => {
    if (!err) {
      concatNames(res);
      callback(err, res);
    }
  });
}
function getByCandidateId(id, callback) {
  interviewDao.getByCandidateId(id, (err, res) => {
    if (!err) {
      concatNames(res);
      callback(err, res);
    }
  });
}

module.exports = {
  insert,
  getByUserId,
  getByCandidateId,
};
