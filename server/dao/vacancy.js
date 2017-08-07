const async = require('async');

const query = require('../queries/vacancy-queries');
const utils = require('../../utils');
const connection = require('./connection').connection;

function getVacancies(skip, capacity, filter, callback) {
  connection.query(query.getVacancies(skip, capacity, filter), callback);
}

function getVacancy(id, callback) {
  async.parallel(
    [
      call => connection.query(query.getVacancy(id), call),
      call => connection.query(query.getSecondarySkills(id), call),
      call => connection.query(query.getOtherSkills(id), call),
    ],
    callback);
}

function updateVacancy(id, vacancy, call) {
  if (Object.keys(vacancy).length !== 0) {
    return connection.query(query.update(id), vacancy, call);
  }
  return call(null, null);
}

function updateSecondarySkills(secSkills, id, call) {
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
}

function updateOtherSkills(otherSkills, id, call) {
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
}

function update(id, config, changes, secSkills, otherSkills, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    async.parallel(
      [
        call => updateVacancy(id, config, call),
        call => updateSecondarySkills(secSkills, id, call),
        call => updateOtherSkills(otherSkills, id, call),
        call => connection.query(query.commitChanges(), changes, (err, res) =>
        connection.query(query.generalHistory(res.insertId), call)),
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
          callback(parError, result);
          return console.log('Update transaction commited');
        });
      });
  });
}


function insertOtherSkills(otherSkills, id, call) {
  if (otherSkills) {
    async.parallel(otherSkills.map(val => eCall =>
          connection.query(query.insertOtherSkill(id, val), eCall)), call);
  }
}

function insertSecSkills(secSkills, id, call) {
  if (secSkills) {
    async.parallel(secSkills.map(val => eCall =>
          connection.query(query.insertSecSkill(id, val), eCall)), call);
  }
}

function addVacancy(vacancy, secSkills, otherSkills, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
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
            callback(error, result);
            return console.log('Commited');
          });
        });
    });
  });
}

function getCandidates(skip, capacity, vacancyId, callback) {
  connection.query(query.getCandidates(skip, capacity, vacancyId), callback);
}

function getAssigned(skip, capacity, vacancyId, callback) {
  connection.query(query.getAssigned(skip, capacity, vacancyId), callback);
}

function changeOtherCandidatesStatus(candidatesArray, call) {
  async.parallel(candidatesArray.map(val => eCall =>
      connection.query(query.changeOtherCandidatesStatus(val), eCall)), call);
}

function closeVacancy(body, callback) {
  body = utils.toCamel(body);
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(query.updateVacancy(body.vacancyId), { status: 8 }, (error) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      async.parallel(
        [
          call => connection.query(query.changeCandidateStatus(body), call),
          call => connection.query(query.changeInterviewStatus(body), call),
          call => connection.query(query.getOtherCandidates(body), (err, res) =>
          changeOtherCandidatesStatus(res, call)),
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
            callback(error, result);
            return console.log('Commited');
          });
        });
    });
  });
}

function getHistory(vacancyId, callback) {
  connection.query(query.getHistory(vacancyId), callback);
}

function getHiringList(skip, capacity, vacancyId, callback) {
  connection.query(query.getHiringList(skip, capacity, vacancyId), callback);
}

module.exports = {
  getVacancies,
  getVacancy,
  getCandidates,
  getAssigned,
  getHistory,
  getHiringList,
  update,
  addVacancy,
  closeVacancy,
};
