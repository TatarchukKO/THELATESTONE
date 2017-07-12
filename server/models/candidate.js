const candidateQuery = require('./candidate-queries.js');
const connection = require('./connection.js').connection;

exports.getCandidates = (skip, filter, callback) => {
  connection.query(candidateQuery.getCandidates(0), callback);
};
