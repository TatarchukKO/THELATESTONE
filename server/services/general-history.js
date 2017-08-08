const model = require('../dao/general-history');
const utils = require('../../utils');

const defaultCapacity = 10;

function formAction(obj) {
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
}

function getName(obj) {
  if (obj.ru_first_name) {
    return `${obj.ruFirstName} ${obj.ruSecondName}`;
  }
  return `${obj.engFirstName} ${obj.engSecondName}`;
}

function formCandidateName(obj, names) {
  const id = obj.candidateChangeId;
  let result;
  names.forEach((item) => {
    if (item.id === id) {
      result = getName(item);
    }
  }, this);
  return result;
}

function formHistory(res) {
  const result = {};
  const names = utils.toCamel(res[1][0]);
  let number = 0;
  res = utils.toCamel(res[0][0]);
  result.array = res.map((item) => {
    const history = {
      subject: `${item.firstName} ${item.secondName}`,
      object: item.candidateChangeId ? formCandidateName(item, names) : item.name,
      date: item.changeDate,
      action: formAction(item),
    };
    number += 1;
    return history;
  });
  result.number = number;
  return result;
}

function getHistory(req, callback) {
  const skip = req.query.skip || 0;
  const capacity = req.query.capacity || defaultCapacity;
  if (req.user.type === 'admin') {
    model.getAdminHistory(skip, capacity, (error, res) => {
      const number = res[2][0][0].total;
      const result = formHistory(res);
      result.array.unshift(number);
      callback(error, result.array);
    });
  } else {
    model.getHrmHistory(skip, capacity, req.user.id, (error, res) => {
      const result = formHistory(res);
      result.array.unshift(result.number);
      callback(error, result.array);
    });
  }
}

module.exports = {
  getHistory,
};
