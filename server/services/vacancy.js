const model = require('../dao/vacancy');
const utils = require('../../utils');

const defaultCapacity = 10;

const getVacancies = (body, callback) => {
  body = utils.toSnake(body);
  const skip = body.skip || 0;
  const capacity = body.capacity || 0;
  const filter = body;
  delete filter.skip;
  delete filter.capacity;
  utils.clearFields(filter);
  model.getVacancies(skip, capacity, filter, (error, result) => {
    callback(error, utils.toCamel(result));
  });
};

const getVacancy = (id, callback) => {
  model.getVacancy(id, (error, result) => {
    const vacancyInfo = result.map(field => field[0]);
    const finalResult = vacancyInfo[0][0];
    finalResult.secondary_skills = vacancyInfo[1].map(fied => fied);
    finalResult.other_skills = vacancyInfo[2];
    callback(error, utils.toCamel(finalResult));
  });
};

const clearSkills = (obj) => {
  const copy = obj;
  delete copy.secondary_skills;
  delete copy.other_skills;
  return copy;
};

const updateVacancy = (id, req, user, callback) => {
  req = utils.toSnake(req);
  const config = {};
  const changes = {};
  const secSkills = req.secondary_skills || [];
  const otherSkills = req.other_skills || [];

  Object.keys(req).forEach((key) => {
    config[`${key}`] = `${req[key]}`;
    changes[`${key}`] = 1;
  });
  clearSkills(config);
  clearSkills(changes);
  if (req.primary_skill_lvl) {
    delete changes.primary_skill_lvl;
    changes.primary_skill = 1;
  }
  changes.vacancy_id = id;
  changes.user_id = user;
  changes.secondary_skills = req.secondary_skills ? 1 : 0;

  if (req.start_date) {
    config.start_date = utils.namesEditor.formatDate(new Date(req.start_date));
  }
  if (req.exp_year) {
    config.exp_year = utils.namesEditor.formatDate(new Date(req.exp_year));
  }

  model.updateVacancy(id, config, changes, secSkills, otherSkills, callback);
};

const addVacancy = (req, callback) => {
  req = utils.toSnake(req);
  const vacancy = {};
  const secSkills = req.secondary_skills || [];
  const otherSkills = req.other_skills || [];

  Object.keys(req).forEach((key) => {
    vacancy[`${key}`] = `${req[key]}`;
  });
  clearSkills(vacancy);

  vacancy.request_date = utils.namesEditor.formatDate(new Date());
  vacancy.start_date = utils.namesEditor.formatDate(new Date(req.start_date));
  vacancy.exp_year = utils.namesEditor.formatDate(new Date(req.exp_year));
  vacancy.linkedin = req.linkedin || 0;
  vacancy.english_lvl = req.english_lvl || 0;
  vacancy.salary_wish = req.salary_wish || 0;
  vacancy.description = req.description;

  model.addVacancy(vacancy, secSkills, otherSkills, callback);
};

const getCandidates = (req, callback) => {
  const skip = req.query.skip || 0;
  const capacity = req.query.capacity || defaultCapacity;
  const vacancyId = req.params.id;
  model.getCandidates(skip, capacity, vacancyId, (err, res) =>
      utils.namesEditor.formatVacancy(err, res, callback));
};

const getAssigned = (req, callback) => {
  const skip = req.query.skip || 0;
  const capacity = req.query.capacity || defaultCapacity;
  const vacancyId = req.params.id;
  model.getAssigned(skip, capacity, vacancyId, (err, res) =>
      utils.namesEditor.formatVacancy(err, res, callback));
};

const closeVacancy = (req, callback) => {
  req = utils.toSnake(req);
  model.closeVacancy(req, callback);
};


const getHistory = (req, callback) => {
  const skip = req.query.skip || 0;
  const capacity = req.query.capacity || defaultCapacity;
  const vacancyId = req.params.id;
  model.getHistory(vacancyId, (err, res) => {
    let number = 0;
    res = utils.toCamel(res);
    let result = [];
    res.map((item) => {
      Object.keys(item).forEach((key) => {
        if (item[`${key}`] === 1) {
          result.push({
            user: `${item.firstName} ${item.secondName}`,
            cahngeDate: new Date(item.changeDate),
            change: utils.formChange(`${key}`),
          });
          number += 1;
        }
      });
      return item;
    });
    result = result.splice(skip, capacity);
    result.unshift(number);
    callback(err, result);
  });
};

const getHiringList = (req, callback) => {
  const skip = req.query.skip || 0;
  const capacity = req.query.capacity || defaultCapacity;
  const vacancyId = req.params.id;
  model.getHiringList(skip, capacity, vacancyId, (err, res) =>
      utils.namesEditor.formatVacancy(err, res, callback));
};

module.exports = {
  getVacancies,
  getVacancy,
  getCandidates,
  getAssigned,
  getHiringList,
  getHistory,
  addVacancy,
  updateVacancy,
  closeVacancy,
};
