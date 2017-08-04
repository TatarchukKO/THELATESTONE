const metaDataService = require('../services/meta-data');

function getEnglishLevels(req, res) {
  metaDataService.getEnglishLevels((error, result) => {
    if (error) {
      console.log('getEnglishLevels error');
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getLocations(req, res) {
  metaDataService.getLocations((error, result) => {
    if (error) {
      console.log('getLocation error');
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getSkills(req, res) {
  metaDataService.getSkills((error, result) => {
    if (error) {
      console.log('getSkills error');
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getCandidateStatuses(req, res) {
  metaDataService.getCandidateStatuses((error, result) => {
    if (error) {
      console.log('getCandidateStatuses error');
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getOtherSkills(req, res) {
  metaDataService.getOtherSkills((error, result) => {
    if (error) {
      console.log('getOtherSkills error');
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getVacancyStatuses(req, res) {
  metaDataService.getVacancyStatuses((error, result) => {
    if (error) {
      console.log('getOtherSkills error');
      throw error;
    }
    return res.status(200).send(result);
  });
}

module.exports = {
  getEnglishLevels,
  getLocations,
  getSkills,
  getCandidateStatuses,
  getOtherSkills,
  getVacancyStatuses,
};
