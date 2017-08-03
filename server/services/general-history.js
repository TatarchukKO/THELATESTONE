
const model = require('../dao/general-history');
const utils = require('../../utils');

const getHistory = (req, callback) => {
  model.getHistory(req, (error, result) => {
    callback(error, utils.toCamel(result));
  });
};

module.exports = {
  getHistory,
};
