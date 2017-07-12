const mysql = require('mysql');
const metaDataQuery = require('./meta-data-queries.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123789',
  database: 'pick_brains_db',
});

connection.connect((error) => {
  if (error) {
    console.log('Models connection error');
    throw error;
  }
  console.log('Meta-data model is connected');
});

exports.getEnglishLevels = (callback) => {
  connection.query(metaDataQuery.englishLevelsQuery, callback);
};
