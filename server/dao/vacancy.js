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

exports.updateVacancy = (id, config, changes, secSkills, otherSkills, callback) => {
  connection.beginTransaction((transError) => {
    if (transError) throw transError;
    connection.query(vacancyQueries.updateVacancy(id), config, (error) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
        async.parallel(
          [
            (call) => {
              if (secSkills) {
                connection.query(vacancyQueries.deleteSecondarySkills(id), (err) => {
                  if (err) {
                    return connection.rollback(() => {
                      throw error;
                    });
                  }
                  return async.parallel(
                    secSkills.map(val => eCall =>
                      connection.query(vacancyQueries.insertSecSkill(id, val), eCall)),
                    call);
                });
              }
            },
            (call) => {
              if (otherSkills) {
                connection.query(vacancyQueries.deleteOtherSkills(id), (err) => {
                  if (err) {
                    return connection.rollback(() => {
                      throw error;
                    });
                  }
                  return async.parallel(
                    otherSkills.map(val => eCall =>
                      connection.query(vacancyQueries.insertOtherSkill(id, val), eCall)),
                    call);
                });
              }
            },
            call =>
              connection.query(vacancyQueries.commitChanges(), changes, call),
            call =>
              connection.query(vacancyQueries.generalHistory(id, changes.change_date), call),
          ],
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
          });
          callback(error, result);
          return console.log('Commited');
        });
    });
  });
};

exports.addVacancy = (vacancy, callback) => {
  connection.query(vacancyQueries.addVacancy(vacancy), callback);
};
