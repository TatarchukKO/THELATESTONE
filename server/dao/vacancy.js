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
  async.parallel(
    [
      call => connection.query(vacancyQueries.getVacancy(id), call),
      call => connection.query(vacancyQueries.getVacancyOtherSkills(id), call),
    ],
    callback);
};
  
exports.updateVacancy = (id, config, secSkills, callback) => {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(vacancyQueries.updateVacancy(id), config, (error) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      async.parallel([
        call => connection.query(vacancyQueries.deleteSecondarySkills(id), (err) => {
          if (err) {
            return connection.rollback(() => {
              throw error;
            });
          }
          async.parallel(
            secSkills.map(val => eCall => connection.query(vacancyQueries.insertSecondarySkill(id, val), eCall)),
            call);
        })],
      (parError, result) => {
        if (parError) {
          return connection.rollback(() => {
            throw parError;
          });
        }
        connection.commit((commitError) => {
          if (commitError) {
            return connection.rollback(() => {
              throw commitError;
            });
          }
          return undefined;
        });
        callback(error, result);
        return console.log('Update transaction has been commited');
      });
      return undefined;
    });
  });
};
