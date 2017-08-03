const async = require('async');
const query = require('../queries/history-queries');
const connection = require('./connection').connection;

const getHistory = (req, callback) => {
  async.parallel(
    [
      call => connection.query(query.getHistory(), call),
    ],
    callback);
};

module.exports = {
  getHistory,
};
