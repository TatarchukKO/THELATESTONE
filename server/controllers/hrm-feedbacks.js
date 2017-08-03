const hrmFeedbackService = require('../services/hrm-feedbacks');
const interviewService = require('../services/interviews.js');

function getById(req, res) {
  hrmFeedbackService.getById(req.query.feedbackid, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}
function getByCandidateId(req, res) {
  hrmFeedbackService.getByCandidateId(req.query.candidateid, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}
function insert(req, res) {
  const obj = req.body;
  obj.userId = req.user.id;
  interviewService.getUserId(obj.interviewId,
    (uErr, uRes) => {
      if (obj.userId !== uRes) {
        return res.sendStatus(403);
      }
      hrmFeedbackService.insert(obj, (error) => {
        if (error) {
          throw error;
        }
        return res.sendStatus(200);
      });
    });
}

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
