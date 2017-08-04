const hrmFeedbackDao = require('../dao/hrm-feedbacks');
const utils = require('../../utils');

function getById(id, callback) {
  hrmFeedbackDao.getById(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = utils.namesEditor.edit(utils.toCamel(res)[0]);
    callback(err, utils.clearFields(result));
  });
}

function getByCandidateId(id, callback) {
  hrmFeedbackDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = utils.namesEditor.editArr(utils.toCamel(res));
    callback(err, utils.clearFields(result));
  });
}

function insert(object, callback) {
  if (object.other && !object.other.trim()) {
    delete object.other;
  }
  hrmFeedbackDao.insert(utils.toSnake(object), callback);
}

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
