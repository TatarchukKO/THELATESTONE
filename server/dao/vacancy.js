const async = require('async');

const query = require('../queries/vacancy-queries');
const connection = require('./connection').connection;

const getVacancies = (limit, filter, callback) => {
  connection.query(query.getVacancies(limit, filter), callback);
};

const getVacancy = (id, callback) => {
  async.parallel(
    [
      call => connection.query(query.getVacancy(id), call),
      call => connection.query(query.getSecondarySkills(id), call),
      call => connection.query(query.getOtherSkills(id), call),
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
          call => connection.query(query.commitChanges(), changes, (err, res) =>
          connection.query(query.generalHistory(res.insertId, changes.change_date), call)),
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


const insertOtherSkills = (otherSkills, id, call) => {
  if (otherSkills) {
    async.parallel(otherSkills.map(val => eCall =>
          connection.query(query.insertOtherSkill(id, val), eCall)), call);
  }
};

const insertSecSkills = (secSkills, id, call) => {
  if (secSkills) {
    async.parallel(secSkills.map(val => eCall =>
          connection.query(query.insertSecSkill(id, val), eCall)), call);
  }
};

const addVacancy = (vacancy, secSkills, otherSkills, callback) => {
  connection.beginTransaction((transError) => {
    if (transError) throw transError;
    connection.query(query.addVacancy(vacancy), (error, res) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      const id = res.insertId;
      async.parallel(
        [
          call => insertSecSkills(secSkills, id, call),
          call => insertOtherSkills(otherSkills, id, call),
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

const getCandidates = (skip, vacancyId, callback) => {
  connection.query(query.getCandidates(skip, vacancyId), callback);
};

const getAssignedCandidates = (skip, vacancyId, callback) => {
  connection.query(query.getAssignedCandidates(skip, vacancyId), callback);
};

module.exports = {
  getVacancies,
  getVacancy,
  getCandidates,
  updateVacancy,
  addVacancy,
  getAssignedCandidates,
};
