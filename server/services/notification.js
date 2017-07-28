const notificationDao = require('../dao/notification');
const utils = require('../../utils');
const dateFormat = require('dateformat');

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

function getUpcomingInterviews(id, callback) {
  const currentTime = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
  let timeLimit = new Date();
  timeLimit.setHours(timeLimit.getHours() + 1);
  timeLimit = dateFormat(timeLimit, 'yyyy-mm-dd HH:MM:ss');
  notificationDao.getUpcomingInterviews(id, currentTime, timeLimit, (err, res) => {
    if (err) {
      throw err;
    }
    let result = utils.formatDates(res);
    result = utils.toCamel(result);
    result = editDoneFields(result);
    callback(err, utils.namesEditor.editArr(result));
  });
}

module.exports = {
  getUpcomingInterviews,
};
