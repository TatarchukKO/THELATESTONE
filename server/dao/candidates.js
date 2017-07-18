const async = require('async');
const query = require('../queries/candidates-queries.js');
const connection = require('./connection.js').connection;

function get(skip, filter, callback) {
  connection.query(query.get(skip, filter), callback);
}

function getById(id, callback) {
  async.parallel([
    call => connection.query(query.getById(id), call),
    call => connection.query(query.getEmails(id), call),
    call => connection.query(query.getSecondarySkills(id), call),
    call => connection.query(query.getOtherSkills(id), call),
  ], callback);
}

function insert(candidate, emails, secSkills, oSkills, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(query.insert(), candidate, (error, res) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      const id = res.insertId;
      async.parallel(Array.prototype.concat(
        emails.map(val => call => connection.query(query.insertEmails(id, val), call)),
        secSkills.map(val => call => connection.query(query.insertSecSkills(id, val), call)),
        oSkills.map(val => call => connection.query(query.insertOtherSkills(id, val), call))),
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
          return console.log('Transaction has been commited');
        });
      return undefined;
    });
  });
}

function updateSecSkill(secSkills, id, call) {
  if (secSkills.length !== 0) {
    return connection.query(query.deleteSecSkills(id), (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      return async.parallel(
        secSkills.map(val => sCall => connection.query(query.insertSecSkills(id, val), sCall)),
        call);
    });
  }
  return call(null, null);
}

function updateEmails(emails, id, call) {
  if (emails.length !== 0) {
    return connection.query(query.deleteEmails(id), (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      return async.parallel(
        emails.map(val => eCall => connection.query(query.insertEmails(id, val), eCall)),
        call);
    });
  }
  return call(null, null);
}

function updateOtherSkills(oSkills, id, call) {
  if (oSkills.length !== 0) {
    return connection.query(query.deleteOtherSkills(id), (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      return async.parallel(
        oSkills.map(val => oCall => connection.query(query.insertOtherSkills(id, val), oCall)),
        call);
    });
  }
  return call(null, null);
}

function update(id, candidate, emails, secSkills, oSkills, changes, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    async.parallel([
      call => connection.query(query.update(id), candidate, call),
      call => updateEmails(emails, id, call),
      call => updateSecSkill(secSkills, id, call),
      call => updateOtherSkills(oSkills, id, call),
      call => connection.query(query.commitChanges(), changes, call),
      call => connection.query(query.generalHistory(id, changes.change_date), call)],
      (error, result) => {
        if (error) {
          return connection.rollback(() => {
            throw error;
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
}

module.exports = {
  get,
  getById,
  insert,
  update,
};
