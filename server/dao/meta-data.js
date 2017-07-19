const mysql = require('mysql');
const metaDataQueries = require('../queries/meta-data-queries.js');
const connection = require('./connection.js').connenction;

exports.getEnglishLevels = (callback) => {
  connection.query(metaDataQueries.englishLevelsQuery, callback);
};
exports.getLocations = (callback) => {
  connection.query(metaDataQueries.locationQuery, callback);
};
exports.getSkills = (callback) => {
  connection.query(metaDataQueries.skillsQuery, callback);
};
exports.getCandidateStatuses = (callback) => {
  connection.query(metaDataQueries.candidateStatusesQuery, callback);
};
exports.getOtherSkills = (callback) => {
  connection.query(metaDataQueries.otherSkillsQuery, callback);
};
exports.getVacancyStatuses = (callback) => {
  connection.query(metaDataQueries.otherSkillsQuery, callback);
};
