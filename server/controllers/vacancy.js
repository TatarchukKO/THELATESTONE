const vacancyServices = require('../services/vacancy.js');

const getConfig = {
  limit: null,
};

const updateConfig = {
  id: null,
  status: null,
};

exports.getVacancies = (req, res) => {
  getConfig.limit = (req.query.limit < 0) ? 0 : (req.query.limit || 0);
  vacancyServices.getVacancies(getConfig, (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    return res.status(200).send(result);
  });
};

exports.getVacancy = (req, res) => {
  vacancyServices.getVacancy(req.params.id, (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    return res.status(200).send(result);
  });
};

exports.updateVacancy = (req, res) => {
  updateConfig.status = req.query.status;
  updateConfig.id = req.params.id;
  updateConfig.city = req.query.city;
  vacancyServices.updateVacancy(updateConfig, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
};
