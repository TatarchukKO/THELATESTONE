const interviewService = require('../services/interviews');

function insert(req, res) {
  const obj = req.body;
  obj.assignerId = req.user.id;
  interviewService.insert(obj, (error) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.sendStatus(201);
  });
}

function getByUserId(req, res) {
  interviewService.getByUserId(req.user.id, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getByCandidateId(req, res) {
  interviewService.getByCandidateId(req.query.id, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

module.exports = {
  insert,
  getByUserId,
  getByCandidateId,
};
