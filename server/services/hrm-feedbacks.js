const hrmFeedbackDao = require('../dao/hrm-feedbacks.js');

function getByCandidateId(id, callback) {
  hrmFeedbackDao.getByCandidateId(id, callback);
}
function insert(object, callback) {
  hrmFeedbackDao.insert(object, callback);
}

module.exports = {
  getByCandidateId,
  insert,
};
