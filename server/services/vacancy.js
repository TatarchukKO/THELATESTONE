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

exports.updateVacancy = (id, reqBody, callback) => {
  const config = {};
  Object.keys(reqBody).forEach((key) => {
    config[`${key}`] = `${reqBody[key]}`;
  });
  delete config.secondary_skills;
  const secondarySkills = reqBody.secondary_skills || [];
  vacancyModel.updateVacancy(id, config, secondarySkills, callback);
};

