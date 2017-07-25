const metaDataDao = require('../dao/meta-data.js');
const convertKeys = require('./convert-keys.js');

function toCamel(arr) {
  return arr.map(item => convertKeys.toCamel(item));
}

function getLocations(callback) {
  metaDataDao.getLocations(callback);
}
function getEnglishLevels(callback) {
  metaDataDao.getEnglishLevels(callback);
}
function getSkills(callback) {
  metaDataDao.getSkills((err, res) => {
    if (err) {
      throw err;
    }
    callback(err, toCamel(res));
  });
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
