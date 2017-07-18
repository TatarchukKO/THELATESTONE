const hrmFeedbackService = require('../services/hrm-feedbacks.js');

function getHrmFeedbacksByCandidateId(req, res) {
  hrmFeedbackService.getHrmFeedbacksByCandidateId(req.params.id, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}
function addHrmFeedback(req, res) {
  hrmFeedbackService.addHrmFeedback(req.body, (error) => {
    if (error) {
      throw error;
    }
    return res.sendStatus(200);
  });
}

module.exports = {
  getHrmFeedbacksByCandidateId,
  addHrmFeedback,
};
