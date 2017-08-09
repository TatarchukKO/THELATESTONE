const services = require('../services/general-history');

function getHistory(req, res) {
  services.getHistory(req, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
}


module.exports = {
  getHistory,
};

