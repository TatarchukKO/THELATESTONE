const async = require('async');
const query = require('./candidates-queries.js');
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
      const id = res.insertId;
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
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

function update(id, candidate, emails, secSkills, oSkills, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    connection.query(query.update(id), candidate, (error) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      async.parallel([
        call => connection.query(query.deleteEmails(id), (err) => {
          if (err) {
            return connection.rollback(() => {
              throw error;
            });
          }
          async.parallel(
            emails.map(val => eCall => connection.query(query.insertEmails(id, val), eCall)),
            call);
        }),
        call => connection.query(query.deleteSecSkills(id), (err) => {
          if (err) {
            return connection.rollback(() => {
              throw error;
            });
          }
          async.parallel(
            secSkills.map(val => sCall => connection.query(query.insertSecSkills(id, val), sCall)),
            call);
        }),
        call => connection.query(query.deleteOtherSkills(id), (err) => {
          if (err) {
            return connection.rollback(() => {
              throw error;
            });
          }
          async.parallel(
            oSkills.map(val => oCall => connection.query(query.insertOtherSkills(id, val), oCall)),
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
}

module.exports = {
  get,
  getById,
  insert,
  update,
};
