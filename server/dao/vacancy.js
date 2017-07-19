const async = require('async');
<<<<<<< HEAD
const vacancyQueries = require('../queries/vacancy-queries.js');
const connection = require('./connection.js').connenction;
=======
const query = require('../queries/vacancy-queries.js');
const connection = require('./connection.js').connection;
>>>>>>> bf9bd0ceb295aa57ae9512d071321f9f14d573a0

const getVacancies = (config, callback) => {
  connection.query(query.getVacancies(config), callback);
};

const getVacancy = (id, callback) => {
  async.parallel(
    [
      call => connection.query(query.getVacancy(id), call),
      call => connection.query(query.getVacancyOtherSkills(id), call),
    ],
    callback);
};

const updateSecondarySkills = (secSkills, id, call) => {
  if (secSkills) {
    connection.query(query.deleteSecondarySkills(id), (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      return async.parallel(
        secSkills.map(val => eCall =>
          connection.query(query.insertSecSkill(id, val), eCall)),
        call);
    });
  }
};

const updateOtherSkills = (otherSkills, id, call) => {
  if (otherSkills) {
    connection.query(query.deleteOtherSkills(id), (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      return async.parallel(
        otherSkills.map(val => eCall =>
          connection.query(query.insertOtherSkill(id, val), eCall)),
        call);
    });
  }
};

const updateVacancy = (id, config, changes, secSkills, otherSkills, callback) => {
  connection.beginTransaction((transError) => {
    if (transError) throw transError;
    connection.query(query.updateVacancy(id), config, (error) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      async.parallel(
        [
          call => updateSecondarySkills(secSkills, id, call),
          call => updateOtherSkills(otherSkills, id, call),
          call => connection.query(query.commitChanges(), changes, call),
          call =>
            connection.query(
              query.generalHistory(id, changes.change_date),
              call),
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

const addVacancy = (vacancy, callback) => {
  connection.query(query.addVacancy(vacancy), callback);
};

module.exports = {
  getVacancies,
  getVacancy,
  updateVacancy,
  addVacancy,
};
