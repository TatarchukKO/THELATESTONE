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
