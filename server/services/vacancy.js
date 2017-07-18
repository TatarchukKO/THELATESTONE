const vacancyModel = require('../dao/vacancy.js');

exports.getVacancies = (config, callback) => {
  vacancyModel.getVacancies(config, callback);
};

exports.getVacancy = (id, callback) => {
  vacancyModel.getVacancy(id, (error, result) => {
    const vacancyInfo = result.map(field => field[0]);
    const finalResult = vacancyInfo[0][0];
    finalResult.secondary_skills = vacancyInfo[1].map(fied => fied);
    callback(error, finalResult);
  });
};

/**
  * DATETIME
  * The supported range is '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.
  */

const formatDate = date =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} 
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

exports.updateVacancy = (id, reqBody, callback) => {
  const config = {};
  const changes = {};
  Object.keys(reqBody).forEach((key) => {
    config[`${key}`] = `${reqBody[key]}`;
    changes[`${key}`] = 1;
  });

  delete config.secondary_skills;
  delete config.other_skills;
  const secondarySkills = reqBody.secondary_skills || [];
  const otherSkills = reqBody.other_skills || [];
  console.log(otherSkills);

  delete changes.secondary_skills;
  delete changes.other_skills;
  delete changes.primary_skill_lvl;
  changes.vacancy_id = id;
  changes.user_id = 2; // User ID
  changes.secondary_skills = reqBody.secondary_skills ? 1 : 0;
  changes.change_date = formatDate(new Date());

  vacancyModel.updateVacancy(id, config, changes, secondarySkills, otherSkills, callback);
};
