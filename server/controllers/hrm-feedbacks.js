const hrmFeedbackService = require('../services/hrm-feedbacks');
const interviewService = require('../services/interviews.js');

function getById(req, res) {
  hrmFeedbackService.getById(req.query.id, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getByCandidateId(req, res) {
  hrmFeedbackService.getByCandidateId(req.query.id, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function insert(req, res) {
  const obj = req.body;
  interviewService.getUserId(obj.interviewId,
    (uErr, uRes) => {
      if (uErr) {
        res.sendStatus(500);
      }
      if (req.user.id !== uRes) {
        return res.sendStatus(403);
      }
      hrmFeedbackService.insert(obj, (error) => {
        if (error) {
          res.sendStatus(500);
          throw error;
        }
        return res.sendStatus(201);
      });
    });
}

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
