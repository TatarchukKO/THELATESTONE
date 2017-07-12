const mysql = require('mysql');
const vacancyQueries = require('../queries/vacancy-queries.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123789',
  database: 'pick_brains_db',
});


connection.connect((error) => {
  if (error) {
    console.log('Db connection error');
    throw error;
  }
  console.log('Connected to db');
});


exports.getVacancies = (config, callback) => {
  connection.query(vacancyQueries.getVacancies(config), callback);
};
