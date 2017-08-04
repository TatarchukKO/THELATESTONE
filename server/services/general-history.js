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
  return 'nothing';
};

const getName = (obj) => {
  if (obj.ru_first_name) {
    return `${obj.ruFirstName} ${obj.ruSecondName}`;
  }
  return `${obj.engFirstName} ${obj.engSecondName}`;
};

const formCandidateName = (obj, names) => {
  const id = obj.candidateChangeId;
  let result;
  names.forEach((item) => {
    if (item.id === id) {
      result = getName(item);
    }
  }, this);
  return result;
};


const getHistory = (req, callback) => {
  model.getHistory(req, (error, res) => {
    const names = utils.toCamel(res[1][0]);
    res = utils.toCamel(res[0][0]);
    const result = res.map((item) => {
      const history = {
        subject: `${item.firstName} ${item.secondName}`,
        object: item.candidateChangeId ? formCandidateName(item, names) : item.name,
        date: item.changeDate,
        action: formAction(item),
      };
      return history;
    });
    callback(error, result);
  });
};

module.exports = {
  getHistory,
};
