const tsFeedbackService = require('../services/ts-feedbacks.js');

function getById(req, res) {
  tsFeedbackService.getById(req.query.id, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}
function getByCandidateId(req, res) {
  tsFeedbackService.getByCandidateId(req.params.id, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}
function insert(req, res) {
  tsFeedbackService.insert(req.body, (error) => {
    if (error) {
      throw error;
    }
    return res.sendStatus(200);
  });
}

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
