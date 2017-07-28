const hrmFeedbackDao = require('../dao/hrm-feedbacks');
const utils = require('../../utils');

function getById(id, callback) {
  hrmFeedbackDao.getById(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = utils.toCamel(res);
    callback(err, utils.namesEditor.editArr(result));
  });
}
function getByCandidateId(id, callback) {
  hrmFeedbackDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = utils.toCamel(res);
    callback(err, utils.namesEditor.editArr(result));
  });
}
function insert(object, callback) {
  hrmFeedbackDao.insert(utils.toSnake(object), callback);
}

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
