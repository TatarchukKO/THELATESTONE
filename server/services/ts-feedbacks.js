const tsFeedbackDao = require('../dao/ts-feedbacks.js');

function getTsFeedbacksByCandidateId(id, callback) {
  tsFeedbackDao.getTsFeedbacksByCandidateId(id, callback);
}
function addTsFeedback(object, callback) {
  tsFeedbackDao.addTsFeedback(object, callback);
}

module.exports = {
  getTsFeedbacksByCandidateId,
  addTsFeedback,
};
