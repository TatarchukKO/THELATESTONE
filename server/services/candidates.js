const candidatesModel = require('../models/candidates.js');

function get(skip, filter, callback) {
  candidatesModel.get(skip, filter, (error, result) => {
    const res = result.map((value) => {
      const tmp = {};
      tmp.name = `${value.eng_first_name} ${value.eng_second_name}`;
      tmp.email = value.email;
      tmp.status = value.status;
      tmp.city = value.city;
      tmp.contact_date = value.contact_date;
      tmp.skill_name = value.skill_name;
      tmp.id = value.id;
      return tmp;
    });
    callback(error, res);
  });
}

function getById(id, callback) {
  candidatesModel.getById(id, (error, result) => {
    const item = result.map(val => val[0]);
    const res = item[0][0];
    res.emails = item[1].map(val => val.email);
    res.sec_skills = item[2];
    res.other_skills = item[3].map(val => val.skill);
    callback(error, res);
  });
}

function insert(candidate, callback) {
  const emails = candidate.emails || [];
  const secSkills = candidate.sec_skills || [];
  const oSkills = candidate.other_skills || [];
  const item = candidate;
  delete item.emails;
  delete item.sec_skills;
  delete item.other_skills;
  candidatesModel.insert(candidate, emails, secSkills, oSkills, callback);
}

module.exports = {
  get,
  getById,
  insert,
};
