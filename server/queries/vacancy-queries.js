/** All Vacancies */

exports.getVacancies = config => `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
  skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status FROM vacancy 
  LEFT JOIN skills ON vacancy.id = skills.id
  LEFT JOIN location ON vacancy.city = location.id
  LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id 
  LIMIT ${config.limit}, 2`;

/** Single Vacancy */

exports.getVacancy = id => `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
  skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status FROM vacancy 
  LEFT JOIN skills ON vacancy.id = skills.id
  LEFT JOIN location ON vacancy.city = location.id
  LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id WHERE 
  vacancy.id = '${id}'`;

exports.getVacancyOtherSkills = id => `SELECT skills.skill_name, vacancy_secondary_skills.lvl
  FROM vacancy_secondary_skills
  LEFT JOIN skills ON vacancy_secondary_skills.skill_id = skills.id
  WHERE  vacancy_secondary_skills.vacancy_id = ${id}`;

exports.updateVacancy = (config) => {
  let result = [];
  result += 'UPDATE vacancy SET ';
  if (config.name != null) {
    result += ` name = ${config.name}`;
  }
  if (config.startDate != null) {
    result += ` start_date = ${config.date}`;
  }
  if (config.primarySkill != null) {
    result.push += ` primary_skill = ${config.primarySkill}`;
  }
  if (config.primarySkillLvl != null) {
    result.push += ` primary_skill_lvl = ${config.primarySkillLvl}`;
  }
  if (config.city != null) {
    result += ` city = ${config.city}`;
  }
  if (config.status != null) {
    result += ` status = ${config.status}`;
  }
  result += ` WHERE id = ${config.id}`;
  console.log(result);
  return result;
};

