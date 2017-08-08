
const services = require('../services/vacancy');

function getVacancies(req, res) {
  services.getVacancies(req.body, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getVacancy(req, res) {
  services.getVacancy(req.params.id, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function update(req, res) {
  services.update(req.params.id, req.body, req.user.id, (error) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send();
  });
}

function addVacancy(req, res) {
  services.addVacancy(req.body, req.user.id, (error) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.sendStatus(201);
  });
}

function getCandidates(req, res) {
  services.getCandidates(req, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getAssigned(req, res) {
  services.getAssigned(req, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function closeVacancy(req, res) {
  services.closeVacancy(req.body, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getHistory(req, res) {
  services.getHistory(req, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getHiringList(req, res) {
  services.getHiringList(req, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

module.exports = {
  getVacancies,
  getVacancy,
  getCandidates,
  getHistory,
  getHiringList,
  update,
  addVacancy,
  getAssigned,
  closeVacancy,
};

