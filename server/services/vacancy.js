const vacancyModel = require('../dao/vacancy.js');

const getVacancies = (config, callback) => {
  vacancyModel.getVacancies(config, callback);
};

const getVacancy = (id, callback) => {
  vacancyModel.getVacancy(id, (error, result) => {
    const vacancyInfo = result.map(field => field[0]);
    const finalResult = vacancyInfo[0][0];
    finalResult.secondary_skills = vacancyInfo[1].map(fied => fied);
    finalResult.other_skills = vacancyInfo[2];
    callback(error, finalResult);
  });
};

const formatDate = date =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} 
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

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
// const secSkills = req.secondary_skills || [];
// const otherSkills = req.other_skills || [];
  Object.keys(req).forEach((key) => {
    vacancy[`${key}`] = `${req[key]}`;
  });
  clearSkills(vacancy);
  vacancy.request_date = formatDate(new Date());
  vacancy.start_date = formatDate(new Date());
  vacancyModel.addVacancy(vacancy, callback);
};

module.exports = {
  getVacancies,
  getVacancy,
  addVacancy,
  updateVacancy,
};

