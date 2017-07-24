const vacancyModel = require('../dao/vacancy.js');
const converter = require('convert-keys');


const getVacancies = (body, callback) => {
  const limit = (body.limit < 0) ? 0 : (body.limit || 0);
  const filter = body;
  delete filter.limit;
  vacancyModel.getVacancies(limit, filter, (error, result) => {
    Object.keys(result).forEach((key) => {
      console.log(result[key]);
    });
    callback(error, converter.toCamel(result));
  });
};

const getVacancy = (id, callback) => {
  vacancyModel.getVacancy(id, (error, result) => {
    const vacancyInfo = result.map(field => field[0]);
    const finalResult = vacancyInfo[0][0];
    finalResult.secondary_skills = vacancyInfo[1].map(fied => fied);
    finalResult.other_skills = vacancyInfo[2];
    callback(error, converter.toCamel(finalResult));
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

const updateVacancy = (id, req, callback) => {
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

  delete changes.primary_skill_lvl;
  changes.vacancy_id = id;
  changes.user_id = 2; // User ID
  changes.secondary_skills = req.secondary_skills ? 1 : 0;
  changes.change_date = formatDate(new Date());

  vacancyModel.updateVacancy(id, config, changes, secSkills, otherSkills, callback);
};

const addVacancy = (req, callback) => {
  const vacancy = {};
  const secSkills = req.secondary_skills || [];
  const otherSkills = req.other_skills || [];
  Object.keys(req).forEach((key) => {
    vacancy[`${key}`] = `${req[key]}`;
  });
  clearSkills(vacancy);
  vacancy.request_date = formatDate(new Date());
  vacancy.start_date = formatDate(new Date());
  vacancy.exp_year = formatDate(new Date());
  vacancy.linkedin = req.linkedin || 0;
  vacancy.english_lvl = req.english_lvl || 0;
  vacancy.salary_wish = req.salary_wish || 0;
  vacancyModel.addVacancy(vacancy, secSkills, otherSkills, callback);
};

module.exports = {
  getVacancies,
  getVacancy,
  addVacancy,
  updateVacancy,
};

