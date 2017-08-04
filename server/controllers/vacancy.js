const services = require('../services/vacancy');

const getVacancies = (req, res) => {
  services.getVacancies(req.body, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
};

const getVacancy = (req, res) => {
  services.getVacancy(req.params.id, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
};

const updateVacancy = (req, res) => {
  services.updateVacancy(req.params.id, req.body, req.user.id, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
};

const addVacancy = (req, res) => {
  services.addVacancy(req.body, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
};

const getCandidates = (req, res) => {
  services.getCandidates(req, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
};

const getAssigned = (req, res) => {
  services.getAssigned(req, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
};

const closeVacancy = (req, res) => {
  services.closeVacancy(req.body, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
};

const getHistory = (req, res) => {
  services.getHistory(req, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
};

const getHiringList = (req, res) => {
  services.getHiringList(req, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
};

module.exports = {
  getVacancies,
  getVacancy,
  getCandidates,
  getHistory,
  getHiringList,
  updateVacancy,
  addVacancy,
  getAssigned,
  closeVacancy,
};

