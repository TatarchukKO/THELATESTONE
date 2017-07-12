const async = require('async');
const candidateQuery = require('./candidate-queries.js');
const connection = require('./connection.js').connection;

exports.getCandidates = (skip, filter, callback) => {
  connection.query(candidateQuery.getCandidates(skip, filter), callback);
};

exports.getCandidateById = (id, callback) => {
  async.parallel([
    call => connection.query(candidateQuery.getCandidateById(id), call),
    call => connection.query(candidateQuery.getCandidateEmails(id), call),
  ], callback
  );
};
