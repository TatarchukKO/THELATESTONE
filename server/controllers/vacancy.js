const vacancyServices = require('../services/vacancy');

const getVacancies = (req, res) => {
  vacancyServices.getVacancies(req.body, (error, result) => {
    if (error) throw error;
    return res.status(200).send(result);
  });
};

const getVacancy = (req, res) => {
  vacancyServices.getVacancy(req.params.id, (error, result) => {
    if (error) throw error;
    return res.status(200).send(result);
  });
};

const updateVacancy = (req, res) => {
  vacancyServices.updateVacancy(req.params.id, req.body, (error, result) => {
    if (error) throw error;
    return res.status(200).send(result);
  });
};

const addVacancy = (req, res) => {
  vacancyServices.addVacancy(req.body, (error, result) => {
    if (error) throw error;
    return res.status(200).send(result);
  });
};

const getCandidates = (req, res) => {
  vacancyServices.getCandidates(req.query.skip, req.params.id, (error, result) => {
    if (error) throw error;
    return res.status(200).send(result);
  });
};

module.exports = {
  getVacancies,
  getVacancy,
  getCandidates,
  updateVacancy,
  addVacancy,
};

