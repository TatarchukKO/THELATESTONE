const metaDataDao = require('../dao/meta-data.js');

function getLocations(callback) {
  metaDataDao.getLocations(callback);
}
function getEnglishLevels(callback) {
  metaDataDao.getEnglishLevels(callback);
}
function getSkills(callback) {
  metaDataDao.getSkills(callback);
}
function getCandidateStatuses(callback) {
  metaDataDao.getCandidateStatuses(callback);
}
function getOtherSkills(callback) {
  metaDataDao.getOtherSkills(callback);
}
function getVacancyStatuses(callback) {
  metaDataDao.getVacancyStatuses(callback);
}

module.exports = {
  getEnglishLevels,
  getLocations,
  getSkills,
  getCandidateStatuses,
  getOtherSkills,
  getVacancyStatuses,
};
