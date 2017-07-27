const dateFormat = require('dateformat');

function formatDate(object) {
  const tmp = object;
  if (tmp.date) {
    tmp.date = dateFormat(tmp.date, 'yyyy-mm-dd HH:MM:ss');
  }
  if (tmp.exp_year) {
    tmp.exp_year = dateFormat(tmp.exp_year, 'yyyy-mm-dd HH:MM:ss');
  }
  if (tmp.change_date) {
    tmp.change_date = dateFormat(tmp.change_date, 'yyyy-mm-dd HH:MM:ss');
  }
  return tmp;
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
  if (obj.firstName) {
    obj.userName = `${obj.firstName} ${obj.secondName}`;
    delete obj.firstName;
    delete obj.secondName;
  }
  if (obj.name) {
    obj.vacancyName = obj.name;
    delete obj.name;
  }

  delete obj.ruFirstName;
  delete obj.ruSecondName;
  delete obj.engFirstName;
  delete obj.engSecondName;

  return obj;
}
function editNames(arr) {
  return arr.map(item => editObjNames(item));
}
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
function clearFields(item) {
  Object.keys(item).forEach((field) => {
    if (!item[field]) {
      delete item[field];
    }
  });
  return item;
}

module.exports = {
  formatDate,
  formatDates,
  isEngName,
  editNames,
  editDoneFields,
  clearFields,
};
