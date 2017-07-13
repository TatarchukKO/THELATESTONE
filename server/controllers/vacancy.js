const vacancyServices = require('../services/vacancy.js');

const config = {
  limit: null,
};

exports.getVacancies = (req, res) => {
  config.limit = (req.query.limit < 0) ? 0 : (req.query.limit || 0);
  vacancyServices.getVacancies(config, (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    return res.status(200).send(result);
  });
};

exports.getVacancy = (req, res) => {
  console.log(req.params.id);
  vacancyServices.getVacancy(req.params.id, (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    return res.status(200).send(result);
  });
};

