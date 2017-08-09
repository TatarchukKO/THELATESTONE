const connection = require('../dao/connection').connection;

function getNames(callback) {
  return connection.query(`SELECT id, eng_first_name, eng_second_name
    FROM candidate`, callback);
}

module.exports = {
  getNames,
};
