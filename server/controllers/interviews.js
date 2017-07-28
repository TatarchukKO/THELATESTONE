const interviewService = require('../services/interviews.js');

function insert(req, res) {
  const obj = req.body;
  obj.assignerId = req.user.id;
  interviewService.insert(obj, (error) => {
    if (error) {
      throw error;
    }
    return res.sendStatus(200);
  });
}
function getByUserId(req, res) {
  interviewService.getByUserId(req.user.id, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}
function getByCandidateId(req, res) {
  interviewService.getByCandidateId(req.query.candidateid, (error, result) => {
    if (error) {
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
