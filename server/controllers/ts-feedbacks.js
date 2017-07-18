const tsFeedbackService = require('../services/ts-feedbacks.js');

function getTsFeedbacksByCandidateId(req, res) {
  tsFeedbackService.getTsFeedbacksByCandidateId(req.params.id, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}
function addTsFeedback(req, res) {
  tsFeedbackService.addTsFeedback(req.body, (error) => {
    if (error) {
      throw error;
    }
    return res.sendStatus(200);
  });
}

module.exports = {
  getTsFeedbacksByCandidateId,
  addTsFeedback,
};
