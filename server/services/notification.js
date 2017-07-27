const notificationDao = require('../dao/notification.js');
const utils = require('../../utils.js');
const dateFormat = require('dateformat');
const convertKeys = require('./convert-keys');

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
    result = convertKeys.toCamel(result);
    result = utils.editDoneFields(result);
    callback(err, utils.editNames(result));
  });
}

module.exports = {
  getUpcomingInterviews,
};
