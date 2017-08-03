const query = require('../queries/history-queries');
const connection = require('./connection').connection;

const getHistory = (req, callback) => {
  connection.query(query.getHistory(), callback);
};

module.exports = {
  getHistory,
};
