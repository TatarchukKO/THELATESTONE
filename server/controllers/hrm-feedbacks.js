const hrmFeedbackService = require('../services/hrm-feedbacks.js');

function getByCandidateId(req, res) {
  hrmFeedbackService.getByCandidateId(req.params.id, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}
function insert(req, res) {
  hrmFeedbackService.insert(req.body, (error) => {
    if (error) {
      throw error;
    }
    return res.sendStatus(200);
  });
}

module.exports = {
  getByCandidateId,
  insert,
};
