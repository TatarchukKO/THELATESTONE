const connection = require('./connection.js').connection;
const metaDataQueries = require('../queries/meta-data-queries.js');

function getEnglishLevels(callback) {
  connection.query(metaDataQueries.englishLevelsQuery(), callback);
}
function getLocations(callback) {
  connection.query(metaDataQueries.locationQuery(), callback);
}
function getSkills(callback) {
  connection.query(metaDataQueries.skillsQuery(), callback);
}
function getCandidateStatuses(callback) {
  connection.query(metaDataQueries.candidateStatusesQuery(), callback);
}
function getOtherSkills(callback) {
  connection.query(metaDataQueries.otherSkillsQuery(), callback);
}
function getVacancyStatuses(callback) {
  connection.query(metaDataQueries.vacancyStatusesQuery(), callback);
}

module.exports = {
  getEnglishLevels,
  getLocations,
  getSkills,
  getCandidateStatuses,
  getOtherSkills,
  getVacancyStatuses,
};
