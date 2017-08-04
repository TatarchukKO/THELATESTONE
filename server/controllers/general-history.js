const services = require('../services/general-history');

const getHistory = (req, res) => {
  services.getHistory(req, (error, result) => {
    if (error) throw error;
    return res.status(200).send(result);
  });
};


module.exports = {
  getHistory,
};

