const candidatesService = require('../services/candidates.js');

function get(req, res) {
  candidatesService.get(req.body, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getById(req, res) {
  candidatesService.getById(req.params.id, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
}

function insert(req, res) {
  candidatesService.insert(req.body, (error) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send();
  });
}

function update(req, res) {
  candidatesService.update(req.params.id, req.body, req.user.id, (error) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send();
  });
}

function search(req, res) {
  candidatesService.search(req.body.candidate, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
}

module.exports = {
  get,
  getById,
  insert,
  update,
  search,
};
