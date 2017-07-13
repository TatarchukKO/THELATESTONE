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

function insert(candidate, callback) {
  const id = candidate.id;
  const emails = candidate.emails;
  const secSkills = candidate.sec_skills;
  const oSkills = candidate.other_skills;
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    async.parallel([
      call => connection.query(query.insert(candidate), call),
      call => connection.query(query.insertOtherSkills(id, candidate.other_skills), call),
    ].concat(
      emails.map(email => call => connection.query(query.insertEmails(id, email), call)),
      secSkills.map(skill => call => connection.query(query.insertSecSkills(id, skill), call)),
      oSkills.map(skill => call => connection.query(query.insertOtherSkills(id, skill), call))), 
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
      });
      callback(error, result);
      console.log('Transaction has been commited');
    });
  });
}

module.exports = {
  get,
  getById,
  insert,
};
