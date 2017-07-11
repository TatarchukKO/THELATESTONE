const mysql = require('mysql');
const sqlQueries = require('./sqlQueries.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123789',
  database: 'pick_brains_db',
});

connection.connect((error) => {
  error ? console.log('Models connection error') : console.log('Meta-data model is connected');
});

exports.getEnglishLevels = (callback) => {
  connection.query(sqlQueries.englishLevelsQuery, callback);
};