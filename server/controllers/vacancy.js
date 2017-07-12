const vacancyModel = require('../models/vacancy.js');

const config = {
  limit: null,
};

exports.getVacancies = (req, res) => {
  config.limit = (req.query.limit < 0) ? 0 : (req.query.limit || 0);
  vacancyModel.getVacancies(config, (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    return res.status(200).send(result);
  });
};
