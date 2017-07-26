const convertKeys = require('./server/services/convert-keys.js');
const dateFormat = require('dateformat');

function toCamel(arr) {
  return arr.map(item => convertKeys.toCamel(item));
}
function formatDate(object) {
  object.date = dateFormat(object.date, 'yyyy-mm-dd HH:MM:ss');
  return object;
}
function formatDates(arr) {
  return arr.map(item => formatDate(item));
}
function isEngName(obj) {
  if (obj.ruFirstName || obj.ruSecondName) {
    return false;
  }
  return true;
}
function editObjNames(obj) {
  if (isEngName(obj)) {
    obj.candidateName = `${obj.engFirstName} ${obj.engSecondName}`;
  } else {
    obj.candidateName = `${obj.ruFirstName} ${obj.ruSecondName}`;
  }

  obj.userName = `${obj.firstName} ${obj.secondName}`;
  obj.vacancyName = obj.name;

  delete obj.name;
  delete obj.firstName;
  delete obj.secondName;
  delete obj.ruFirstName;
  delete obj.ruSecondName;
  delete obj.engFirstName;
  delete obj.engSecondName;

  return obj;
}
function editNames(arr) {
  return arr.map(item => editObjNames(item));
}

module.exports = {
  formatDate,
  formatDates,
  toCamel,
  isEngName,
  editNames,
};
