const query = require('../queries/users');
const connection = require('./connection').connection;

function get(type, callback) {
  return connection.query(query.get(type), callback);
}

module.exports = {
  get,
};
