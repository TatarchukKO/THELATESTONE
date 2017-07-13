const candidatesModel = require('../models/candidates.js');

function getCandidates(skip, filter, callback) {
  candidatesModel.getCandidates(skip, filter, callback);
}

function getCandidateById(id, callback) {
  candidatesModel.getCandidateById(id, (error, result) => {
    const item = result.map(val => val[0]);
    const res = item[0][0];
    res.emails = item[1].map(val => val.email);
    res.sec_skills = item[2];
    res.other_skills = item[3].map(val => val.skill);
    callback(error, res);
  });
}

module.exports = {
  getCandidates,
  getCandidateById,
};
