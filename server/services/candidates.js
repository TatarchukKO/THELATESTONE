const candidatesModel = require('../dao/candidates.js');
const translit = require('translitit-cyrillic-russian-to-latin');
const metaphone = require('metaphone');
const convKeys = require('./convert-keys');

function get(paramsSnake, callback) {
  const params = convKeys.toSnake(paramsSnake);
  const skip = params.skip;
  let filter = params;
  delete filter.skip;
  if (Object.keys(filter).length === 0) {
    filter = undefined;
  }
  candidatesModel.get(skip, filter, (error, result) => {
    const res = result.map((value) => {
      const tmp = {};
      if (value.ru_first_name) {
        tmp.name = `${value.ru_first_name} ${value.ru_second_name}`;
      } else {
        tmp.name = `${value.eng_first_name} ${value.eng_second_name}`;
      }
      tmp.email = value.email;
      tmp.status = value.status;
      tmp.city = value.city;
      tmp.contact_date = value.contact_date;
      tmp.skill_name = value.skill_name;
      tmp.id = value.id;
      return tmp;
    });
    callback(error, convKeys.toCamel(res));
  });
}

function getById(id, callback) {
  candidatesModel.getById(id, (error, result) => {
    const item = result.map(val => val[0]);
    const res = item[0][0];
    if (res.ru_first_name) {
      res.first_name = res.ru_first_name;
      res.second_name = res.ru_second_name;
      delete res.ru_first_name;
      delete res.ru_second_name;
    } else {
      res.first_name = res.eng_first_name;
      res.second_name = res.eng_second_name;
    }
    delete res.eng_first_name;
    delete res.eng_second_name;
    res.emails = item[1].map(val => val.email);
    res.sec_skills = item[2];
    res.other_skills = item[3];
    callback(error, convKeys.toCamel(res));
  });
}

function insert(candidateSnake, callback) {
  const candidate = convKeys.toSnake(candidateSnake);
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
  const meta = {
    first: metaphone(item.eng_first_name),
    second: metaphone(item.eng_second_name),
  };
  delete item.emails;
  delete item.sec_skills;
  delete item.other_skills;
  candidatesModel.insert(item, emails, secSkills, oSkills, meta, callback);
}

function update(id, candidateSnake, user, callback) {
  const candidate = convKeys.toSnake(candidateSnake);
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
  changes.user_id = user;
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
  const meta = {
    first: metaphone(item.eng_first_name),
    second: metaphone(item.eng_second_name),
    candidate_id: id,
  };
  delete item.emails;
  delete item.sec_skills;
  delete item.other_skills;
  delete item.change_date;
  candidatesModel.update(id, item, emails, secSkills, oSkills, changes, meta, callback);
}

function search(query, bodySnake, callback) {
  let params = query.candidate.split(' ');
  const body = convKeys.toSnake(bodySnake);
  const skip = body.skip;
  let filter = body;
  delete filter.skip;
  if (Object.keys(filter).length === 0) {
    filter = undefined;
  }
  if (params.length > 2) {
    params = params.slice(1, 3);
  }
  params = params.map(val => metaphone(translit(val)));
  candidatesModel.search(params, skip, filter, (error, result) => {
    const res = result.map((value) => {
      const tmp = {};
      if (value.ru_first_name) {
        tmp.name = `${value.ru_first_name} ${value.ru_second_name}`;
      } else {
        tmp.name = `${value.eng_first_name} ${value.eng_second_name}`;
      }
      tmp.email = value.email;
      tmp.status = value.status;
      tmp.city = value.city;
      tmp.contact_date = value.contact_date;
      tmp.skill_name = value.skill_name;
      tmp.id = value.id;
      return tmp;
    });
    callback(error, convKeys.toCamel(res));
  });
}

function searchByEmail(query, bodySnake, callback) {
  let params = query.candidate.split(' ');
  const body = convKeys.toSnake(bodySnake);
  const skip = body.skip;
  let filter = body;
  delete filter.skip;
  if (Object.keys(filter).length === 0) {
    filter = undefined;
  }
  if (params.length > 1) {
    params = params.slice(1, 2);
  }
  params = params.map(val => metaphone(translit(val)));
  candidatesModel.search(params, skip, filter, (error, result) => {
    const res = result.map((value) => {
      const tmp = {};
      if (value.ru_first_name) {
        tmp.name = `${value.ru_first_name} ${value.ru_second_name}`;
      } else {
        tmp.name = `${value.eng_first_name} ${value.eng_second_name}`;
      }
      tmp.email = value.email;
      tmp.status = value.status;
      tmp.city = value.city;
      tmp.contact_date = value.contact_date;
      tmp.skill_name = value.skill_name;
      tmp.id = value.id;
      return tmp;
    });
    callback(error, convKeys.toCamel(res));
  });
}

module.exports = {
  get,
  getById,
  insert,
  update,
  search,
  searchByEmail,
};
