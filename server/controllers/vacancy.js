const vacancyServices = require('../services/vacancy.js');

const getConfig = {
  limit: null,
};

const getVacancies = (req, res) => {
  getConfig.limit = (req.query.limit < 0) ? 0 : (req.query.limit || 0);
  vacancyServices.getVacancies(getConfig, (error, result) => {
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
  console.log(req.body);
  vacancyServices.updateVacancy(req.params.id, req.body, (error, result) => {
    if (error) throw error;
    return res.status(200).send(result);
  });
};

const addVacancy = (req, res) => {
  console.log(req.body);
  vacancyServices.addVacancy(req.body, (error, result) => {
    if (error) throw error;
    return res.status(200).send(result);
  });
};

module.exports = {
  getVacancies,
  getVacancy,
  updateVacancy,
  addVacancy,
};

