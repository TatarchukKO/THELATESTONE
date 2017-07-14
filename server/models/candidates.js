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
        emails.map(email => call => connection.query(query.insertEmails(id, email), call)),
        secSkills.map(skill => call => connection.query(query.insertSecSkills(id, skill), call)),
        oSkills.map(skill => call => connection.query(query.insertOtherSkills(id, skill), call))),
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

module.exports = {
  get,
  getById,
  insert,
};
