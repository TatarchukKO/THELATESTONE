const tsFeedbackService = require('../services/ts-feedbacks');
const interviewService = require('../services/interviews.js');

function getById(req, res) {
  tsFeedbackService.getById(req.query.id, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getByCandidateId(req, res) {
  tsFeedbackService.getByCandidateId(req.query.candidateid, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
}

function insert(req, res) {
  const obj = req.body;
  interviewService.getUserId(obj.interviewId,
    (uErr, uRes) => {
      if (req.user.id !== uRes) {
        return res.sendStatus(403);
      }
      tsFeedbackService.insert(obj, (error) => {
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
