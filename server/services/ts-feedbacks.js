const tsFeedbackDao = require('../dao/ts-feedbacks.js');
const convertKeys = require('./convert-keys.js');
const utils = require('../../utils.js');

function getById(id, callback) {
  tsFeedbackDao.getById(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = convertKeys.toCamel(res);
    callback(err, utils.namesEditor.editArr(result));
  });
}

function getByCandidateId(id, callback) {
  tsFeedbackDao.getByCandidateId(id, (err, res) => {
    if (err) {
      throw err;
    }
    const result = convertKeys.toCamel(res);
    callback(err, utils.namesEditor.editArr(result));
  });
}

function insert(object, callback) {
  tsFeedbackDao.insert(convertKeys.toSnake(object), callback);
}

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
