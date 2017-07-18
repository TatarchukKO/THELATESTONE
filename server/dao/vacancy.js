const mysql = require('mysql');
const async = require('async');
const vacancyQueries = require('../queries/vacancy-queries.js');
const connection = require('./connection.js').conenction;

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

exports.updateVacancy = (id, config, changes, secSkills, callback) => {
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
      async.parallel(
        [
          call =>
            connection.query(vacancyQueries.deleteSecondarySkills(id), (err) => {
              if (err) {
                return connection.rollback(() => {
                  throw error;
                });
              }
              return async.parallel(
                secSkills.map(val => eCall =>
                  connection.query(vacancyQueries.insSecSkill(id, val), eCall)),
                call);
            }),
         /* Install db update! */
         /* call =>
            connection.query(vacancyQueries.commitChanges(), changes, call),
          call =>
            connection.query(vacancyQueries.generalHistory(id, changes.change_date), call),*/
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
            return undefined;
          });
          callback(error, result);
          return console.log('Commited');
        });
      return undefined;
    });
  });
};
