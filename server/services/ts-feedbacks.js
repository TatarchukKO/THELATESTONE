const tsFeedbackDao = require('../dao/ts-feedbacks.js');
const utils = require('../../utils.js');

function getById(id, callback) {
  tsFeedbackDao.getById(id, (err, res) => {
    if (err) {
      throw err;
    }
    if (!res) {
      return callback();
    }
    const result = utils.toCamel(res);
    callback(err, utils.namesEditor.editArr(result)[0]);
  });
}

function getByCandidateId(id, callback) {
  tsFeedbackDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = utils.namesEditor.editArr(utils.toCamel(res));
    callback(err, utils.clearFields(result));
  });
}

function insert(object, callback) {
  tsFeedbackDao.insert(utils.toSnake(object), callback);
}

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
