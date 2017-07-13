const async = require('async');
const candidatesQuery = require('./candidates-queries.js');
const connection = require('./connection.js').connection;

exports.getCandidates = (skip, filter, callback) => {
  connection.query(candidatesQuery.getCandidates(skip, filter), callback);
};

exports.getCandidateById = (id, callback) => {
  async.parallel([
    call => connection.query(candidatesQuery.getCandidateById(id), call),
    call => connection.query(candidatesQuery.getCandidateEmails(id), call),
    call => connection.query(candidatesQuery.getCandidateSecondarySkills(id), call),
    call => connection.query(candidatesQuery.getCandidateOtherSkills(id), call),
  ], callback);
};
