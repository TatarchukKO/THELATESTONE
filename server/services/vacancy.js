const model = require('../dao/vacancy.js');
const convKeys = require('./convert-keys');

const getVacancies = (body, callback) => {
  body = convKeys.toSnake(body);
  const limit = (body.limit < 0) ? 0 : (body.limit || 0);
  const filter = body;
  delete filter.limit;
  model.getVacancies(limit, filter, (error, result) => {
    callback(error, convKeys.toCamel(result));
  });
};

const getVacancy = (id, callback) => {
  model.getVacancy(id, (error, result) => {
    const vacancyInfo = result.map(field => field[0]);
    const finalResult = vacancyInfo[0][0];
    finalResult.secondary_skills = vacancyInfo[1].map(fied => fied);
    finalResult.other_skills = vacancyInfo[2];
    callback(error, convKeys.toCamel(finalResult));
  });
};

const formatDate = date =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

const clearSkills = (obj) => {
  const copy = obj;
  delete copy.secondary_skills;
  delete copy.other_skills;
  return copy;
};

const updateVacancy = (id, req, user, callback) => {
  req = convKeys.toSnake(req);
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

  console.log(changes);
  model.updateVacancy(id, config, changes, secSkills, otherSkills, callback);
};

const addVacancy = (req, callback) => {
  req = convKeys.toSnake(req);
  const vacancy = {};
  const secSkills = req.secondary_skills || [];
  const otherSkills = req.other_skills || [];

  Object.keys(req).forEach((key) => {
    vacancy[`${key}`] = `${req[key]}`;
  });
  clearSkills(vacancy);

  vacancy.request_date = formatDate(new Date());
  vacancy.start_date = formatDate(new Date(req.start_date));
  vacancy.exp_year = formatDate(new Date(req.exp_year));
  vacancy.linkedin = req.linkedin || 0;
  vacancy.english_lvl = req.english_lvl || 0;
  vacancy.salary_wish = req.salary_wish || 0;
  vacancy.description = req.description;

  model.addVacancy(vacancy, secSkills, otherSkills, callback);
};

const mapRes = (error, result, callback) => {
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
    tmp.total = value.total;
    tmp.primary_skill_lvl = value.primary_skill_lvl;
    if (value.date) {
      tmp.date = value.date;
    }
    return tmp;
  });
  callback(error, convKeys.toCamel(res));
};

const getCandidates = (skip, vacancyId, callback) => {
  skip = skip || 0;
  model.getCandidates(skip, vacancyId, (err, res) => mapRes(err, res, callback));
};

const getAssigned = (skip, vacancyId, callback) => {
  skip = skip || 0;
  model.getAssigned(skip, vacancyId, (err, res) => mapRes(err, res, callback));
};

const closeVacancy = (req, callback) => {
  req = convKeys.toSnake(req);
  model.closeVacancy(req, callback);
};

module.exports = {
  getVacancies,
  getVacancy,
  addVacancy,
  updateVacancy,
  getCandidates,
  getAssigned,
  closeVacancy,
};
