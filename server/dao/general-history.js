const async = require('async');
const query = require('../queries/history-queries');
const connection = require('./connection').connection;

const getHistory = (skip, capacity, callback) => {
  console.log(skip + ' ' + capacity);
  async.parallel(
    [
      call => connection.query(query.getHistory(skip, capacity), call),
      call => connection.query(query.getCandidatesNames(), call),
      call => connection.query(query.getRecordsNumber(), call),
    ],
    callback);
};

module.exports = {
  getHistory,
};
