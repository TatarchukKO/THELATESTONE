const tsFeedbackDao = require('../dao/ts-feedbacks.js');

function getByCandidateId(id, callback) {
  tsFeedbackDao.getByCandidateId(id, callback);
}
function insert(object, callback) {
  tsFeedbackDao.insert(object, callback);
}

module.exports = {
  getByCandidateId,
  insert,
};
