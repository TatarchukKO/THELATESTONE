const mysql = require('mysql');
const metaDataQuery = require('./meta-data-queries.js');
const connection = require('./connection.js').connection;

exports.getEnglishLevels = (callback) => {
  connection.query(metaDataQuery.englishLevelsQuery, callback);
};
