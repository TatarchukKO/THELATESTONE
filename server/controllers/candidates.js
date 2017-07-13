const candidatesService = require('../services/candidates.js');

function get(req, res) {
  candidatesService.get(req.skip, req.filter, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getById(req, res) {
  candidatesService.getById(req.params.id, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}

function insert(req, res) {
  candidatesService.insert(req.body, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}

module.exports = {
  get,
  getById,
  insert,
};
