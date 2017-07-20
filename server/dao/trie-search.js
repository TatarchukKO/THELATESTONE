const connection = require('../dao/connection.js').connection;

function getCandidates(callback) {
  return connection.query(`SELECT id, eng_first_name, eng_second_name
    FROM candidate`, callback);
}

module.exports = {
  getCandidates,
};
