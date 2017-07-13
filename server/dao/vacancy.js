const mysql = require('mysql');
const async = require('async');
const vacancyQueries = require('../queries/vacancy-queries.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qweasdzxc',
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


exports.getVacancy = (id, callback) => {
  async.parallel([
    call => connection.query(vacancyQueries.getVacancy(id), call),
    call => connection.query(vacancyQueries.getVacancyOtherSkills(id), call),
  ], callback);
};
