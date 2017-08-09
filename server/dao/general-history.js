const async = require('async');
const query = require('../queries/history-queries');
const connection = require('./connection').connection;

function getAdminHistory(skip, capacity, callback) {
  async.parallel(
    [
      call => connection.query(query.getAdminHistory(skip, capacity), call),
      call => connection.query(query.getCandidatesNames(), call),
      call => connection.query(query.getAdminRecordsNumber(), call),
    ],
    callback);
}

function getHrmHistory(skip, capacity, id, callback) {
  async.parallel(
    [
      call => connection.query(query.getHrmHistory(skip, capacity, id), call),
      call => connection.query(query.getCandidatesNames(), call),
      call => connection.query(query.getAdminRecordsNumber(), call),
    ],
    callback);
}

module.exports = {
  getAdminHistory,
  getHrmHistory,
};
