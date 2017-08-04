
const model = require('../dao/general-history');
const utils = require('../../utils');

const formAction = (obj) => {
  if (obj.vacancyChangeId) {
    return 'Vacancy was changed';
  }
  if (obj.candidateChangeId) {
    return 'Candidate was changed';
  }
  if (obj.hrmFeedbackId) {
    return 'HRM feedback was added';
  }
  if (obj.tsFeedbackId) {
    return 'Tech feedback was added';
  }
  if (obj.interviewId) {
    return 'Interview was assigned/closed';
  }
  return 'Nothing';
};

const formCandidateName = (obj, names) => {
  return 'Andrew';
};

/*

"candidateId": 10,
"ruFirstName": null,
"ruSecondName": null,
"engFirstName": "Andrew",
"engSecondName": "Belous"

*/


/*

"vacancyChangeId": 14,
"candidateChangeId": null,
"hrmFeedbackId": null,
"tsFeedbackId": null,
"interviewId": null,
"changeDate": "2017-07-31T01:01:31.000Z",
"userId": 1,
"firstName": "Vasya",
"secondName": "Pupkin",
"vacancyId": 28,
"name": "Onliner.by"

*/


const getHistory = (req, callback) => {
  model.getHistory(req, (error, res) => {
    callback(error, res);
  });
};

module.exports = {
  getHistory,
};
