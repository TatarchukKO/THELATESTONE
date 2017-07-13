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

exports.updateVacancy = (config, callback) => {
  vacancyModel.updateVacancy(config, callback);
};
