const candidatesModel = require('../models/candidates.js');
const translit = require('translitit-cyrillic-russian-to-latin');

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
  const firstName = translit(item.eng_first_name);
  if (firstName !== item.eng_first_name) {
    item.ru_first_name = item.eng_first_name;
    item.ru_second_name = item.eng_second_name;
    item.eng_first_name = firstName;
    item.eng_second_name = translit(item.eng_second_name);
  }
  delete item.emails;
  delete item.sec_skills;
  delete item.other_skills;
  candidatesModel.insert(item, emails, secSkills, oSkills, callback);
}

function update(id, candidate, callback) {
  const changes = {};
  Object.keys(candidate).forEach((key) => {
    changes[`${key}`] = 1;
  });
  if (candidate.primary_skill_lvl) {
    delete changes.primary_skill_lvl;
    changes.primary_skill = 1;
  }
  changes.change_date = candidate.change_date;
  changes.candidate_id = id;
  changes.user_id = candidate.user_id;
  const emails = candidate.emails || [];
  const secSkills = candidate.sec_skills || [];
  const oSkills = candidate.other_skills || [];
  const item = candidate;
  const firstName = translit(item.eng_first_name);
  if (firstName !== item.eng_first_name) {
    item.ru_first_name = item.eng_first_name;
    item.ru_second_name = item.eng_second_name;
    item.eng_first_name = firstName;
    item.eng_second_name = translit(item.eng_second_name);
  }
  delete item.emails;
  delete item.sec_skills;
  delete item.other_skills;
  delete item.user_id;
  delete item.change_date;
  candidatesModel.update(id, item, emails, secSkills, oSkills, changes, callback);
}

module.exports = {
  get,
  getById,
  insert,
  update,
};
