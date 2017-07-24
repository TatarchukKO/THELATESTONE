/** All Vacancies */

const capacity = 5;

exports.getVacancies = config =>
  `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
  skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status FROM vacancy 
  LEFT JOIN skills ON vacancy.id = skills.id
  LEFT JOIN location ON vacancy.city = location.id
  LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id 
  LIMIT ${config.limit}, ${capacity}`;

/** Single Vacancy */

exports.getVacancy = id =>
  `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
  skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status FROM vacancy 
  LEFT JOIN skills ON vacancy.id = skills.id
  LEFT JOIN location ON vacancy.city = location.id
  LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id 
  WHERE vacancy.id = ${id}`;

exports.getSecondarySkills = id =>
  `SELECT skills.skill_name, vacancy_secondary_skills.lvl
  FROM vacancy_secondary_skills
  LEFT JOIN skills ON vacancy_secondary_skills.skill_id = skills.id
  WHERE  vacancy_secondary_skills.vacancy_id = ${id}`;


exports.getOtherSkills = id =>
  `SELECT other_skills.skill, other_skills.id 
  FROM other_skills_has_vacancy
  LEFT JOIN other_skills ON other_skills_has_vacancy.other_skills_id = other_skills.id
  WHERE other_skills_has_vacancy.vacancy_id = ${id}`;

exports.updateVacancy = id => `UPDATE vacancy SET ? WHERE id = ${id}`;

exports.deleteSecondarySkills = id =>
  `DELETE FROM vacancy_secondary_skills WHERE vacancy_id = ${id}`;

exports.insertSecSkill = (id, skill) =>
  `INSERT INTO vacancy_secondary_skills (vacancy_id, skill_id, lvl)
    VALUES (${id}, ${skill.id}, ${skill.lvl})`;

exports.commitChanges = () => 'INSERT INTO vacancy_changes SET ?';

exports.generalHistory = (id, date) =>
  `INSERT INTO general_history (vacancy_change_id, change_date)
  VALUES (${id},'${date}')`;

exports.deleteOtherSkills = id =>
  `DELETE FROM other_skills_has_vacancy WHERE vacancy_id = ${id}`;

exports.insertOtherSkill = (id, skillId) =>
  `INSERT INTO other_skills_has_vacancy (vacancy_id, other_skills_id)
    VALUES (${id}, ${skillId})`;

exports.addVacancy = vacancy =>
  `INSERT INTO vacancy (name, request_date, start_date, primary_skill, primary_skill_lvl, city, 
    status, linkedin, exp_year, english_lvl, salary_wish)
    VALUES ('${vacancy.name}', '${vacancy.request_date}','${vacancy.start_date}', '${vacancy.primary_skill}',
    ${vacancy.primary_skill_lvl}, '${vacancy.city}', ${vacancy.status},'${vacancy.linkedin}', 
    '${vacancy.exp_year}', '${vacancy.english_lvl}', '${vacancy.salary_wish}')`;
