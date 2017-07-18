const candidateQueries = require('../queries/candidate-queries.js');
const connection = require('./connection.js').connection;

exports.getCandidates = (skip, filter, callback) => {
  connection.query(candidateQueries.getCandidates(0), callback);
};
