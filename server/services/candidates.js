const metaphone = require('metaphone');

const candidatesModel = require('../dao/candidates');
const utils = require('../../utils');

function mapRes(error, result, callback) {
  if(result) {
    result = utils.namesEditor.editArr(utils.toCamel(result));
  }
  callback(error, result);
}

function get(paramsSnake, callback) {
  const params = utils.dateFormatter.format(utils.toSnake(paramsSnake));
  const skip = paramsSnake.skip;
  const amount = paramsSnake.amount;
  let filter = params;
  delete filter.skip;
  delete filter.amount;
  if (Object.keys(filter).length === 0) {
    filter = undefined;
  }
  candidatesModel.get(skip, amount, filter, (err, res) => mapRes(err, res, callback));
}

function getById(id, callback) {
  candidatesModel.getById(id, (error, result) => {
    const item = result.map(val => val[0]);
    let res = item[0][0];
    if (!res) {
      result = 'No such candidate';
      return callback(error, result);
    }
    res = utils.toCamel(res);
    utils.namesEditor.mapNames(res);
    res.emails = item[1].map(val => val.email);
    res.secSkills = item[2];
    res.otherSkills = item[3];
    callback(error, utils.clearFields(utils.toCamel(res)));
  });
}

function insert(candidateSnake, callback) {
  const candidate = utils.dateFormatter.format(utils.toSnake(candidateSnake));
  const emails = candidate.emails || [];
  const secSkills = candidate.sec_skills || [];
  const oSkills = candidate.other_skills || [];
  const item = candidate;
  const firstName = utils.translit(item.eng_first_name);
  if (firstName !== item.eng_first_name) {
    item.ru_first_name = item.eng_first_name;
    item.ru_second_name = item.eng_second_name;
    item.eng_first_name = firstName;
    item.eng_second_name = utils.translit(item.eng_second_name);
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
  const candidate = utils.dateFormatter.format(utils.toSnake(candidateSnake));
  const changes = {};
  Object.keys(candidate).forEach((key) => {
    changes[`${key}`] = 1;
  });
  if (candidate.primary_skill_lvl) {
    delete changes.primary_skill_lvl;
    changes.primary_skill = 1;
  }
  changes.candidate_id = id;
  changes.user_id = user;
  const emails = candidate.emails || [];
  const secSkills = candidate.sec_skills || [];
  const oSkills = candidate.other_skills || [];
  const item = candidate;
  const firstName = utils.translit(item.eng_first_name);
  if (firstName !== item.eng_first_name) {
    item.ru_first_name = item.eng_first_name;
    item.ru_second_name = item.eng_second_name;
    item.eng_first_name = firstName;
    item.eng_second_name = utils.translit(item.eng_second_name);
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
  const body = utils.dateFormatter.format(utils.toSnake(bodySnake));
  const skip = bodySnake.skip;
  const amount = bodySnake.amount;
  let filter = body;
  delete filter.skip;
  delete filter.amount;
  if (Object.keys(filter).length === 0) {
    filter = undefined;
  }
  if (query.candidate) {
    let params = query.candidate.split(' ');
    if (params.length > 2) {
      params = params.slice(1, 3);
    }
    params = params.map(val => metaphone(utils.translit(val)));
    return candidatesModel.search(params, skip, amount, filter, (err, res) =>
      mapRes(err, res, callback));
  }
  if (query.email) {
    const params = query.email.split(' ')[0];
    return candidatesModel.searchByEmail(params, skip, amount, amount, filter, (err, res) =>
      mapRes(err, res, callback));
  }
  if (query.skype) {
    const params = query.skype.split(' ')[0];
    return candidatesModel.searchBySkype(params, skip, amount, filter, (err, res) =>
      mapRes(err, res, callback));
  }
  return callback();
}

module.exports = {
  get,
  getById,
  insert,
  update,
  search,
};
