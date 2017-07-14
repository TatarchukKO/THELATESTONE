const candidatesService = require('../services/candidates.js');

function get(req, res) {
  candidatesService.get(req.params.skip, req.body, (error, result) => {
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
  candidatesService.insert(req.body, (error) => {
    if (error) {
      throw error;
    }
    return res.status(200).send();
  });
}

function update(req, res) {
  candidatesService.update(req.params.id, req.body, (error) => {
    if (error) {
      throw error;
    }
    return res.status(200).send();
  });
}

module.exports = {
  get,
  getById,
  insert,
  update,
};
