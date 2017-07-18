const hrmFeedbackDao = require('../dao/hrm-feedbacks.js');

function getHrmFeedbacksByCandidateId(id, callback) {
  hrmFeedbackDao.getHrmFeedbacksByCandidateId(id, callback);
}
function addHrmFeedback(object, callback) {
  hrmFeedbackDao.addHrmFeedback(object, callback);
}

module.exports = {
  getHrmFeedbacksByCandidateId,
  addHrmFeedback,
};
