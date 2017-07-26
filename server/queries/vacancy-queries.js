/** All Vacancies */

const capacity = 5;

const getVacancies = (limit, filter) => {
  const query = [];
  let sent = 'WHERE ';
  if (filter) {
    Object.keys(filter).forEach((key, i) => {
      if (i === 1) {
        sent = ' AND ';
      }
      if (key === 'english_lvl') {
        query[i] = `${sent}vacancy.${key} >= ${filter[key][0]}`;
        return;
      }
      if (key === 'salary_wish') {
        query[i] = `${sent}vacancy.${key} >= ${filter[key][0]} 
        AND vacancy.${key} <= ${filter[key][1]}`;
        return;
      }
      if (key === 'exp_year') {
        query[i] = `${sent}vacancy.${key} <= ${filter[key][0]}`;
        return;
      }
      query[i] = `${sent}vacancy.${key} = ${filter[key]}`;
    });
  }
  return `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
  skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status FROM vacancy 
  LEFT JOIN skills ON vacancy.id = skills.id
  LEFT JOIN location ON vacancy.city = location.id
  LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id 
  ${query.join('')}
  GROUP BY vacancy.id
  LIMIT ${limit}, ${capacity}`;
};

/** Single Vacancy */

const getVacancy = id =>
  `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
  skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status FROM vacancy 
  LEFT JOIN skills ON vacancy.id = skills.id
  LEFT JOIN location ON vacancy.city = location.id
  LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id 
  WHERE vacancy.id = ${id}`;

const getSecondarySkills = id =>
  `SELECT skills.skill_name, vacancy_secondary_skills.lvl
  FROM vacancy_secondary_skills
  LEFT JOIN skills ON vacancy_secondary_skills.skill_id = skills.id
  WHERE  vacancy_secondary_skills.vacancy_id = ${id}`;

const getOtherSkills = id =>
  `SELECT other_skills.skill, other_skills.id 
  FROM other_skills_has_vacancy
  LEFT JOIN other_skills ON other_skills_has_vacancy.other_skills_id = other_skills.id
  WHERE other_skills_has_vacancy.vacancy_id = ${id}`;

const updateVacancy = id => `UPDATE vacancy SET ? WHERE id = ${id}`;

const deleteSecondarySkills = id =>
  `DELETE FROM vacancy_secondary_skills WHERE vacancy_id = ${id}`;

const insertSecSkill = (id, skill) =>
  `INSERT INTO vacancy_secondary_skills (vacancy_id, skill_id, lvl)
    VALUES (${id}, ${skill.id}, ${skill.lvl})`;

const commitChanges = () => 'INSERT INTO vacancy_changes SET ?';

const generalHistory = (id, date) =>
  `INSERT INTO general_history (vacancy_change_id, change_date)
  VALUES (${id},'${date}')`;

const deleteOtherSkills = id =>
  `DELETE FROM other_skills_has_vacancy WHERE vacancy_id = ${id}`;

const insertOtherSkill = (id, skillId) =>
  `INSERT INTO other_skills_has_vacancy (vacancy_id, other_skills_id)
    VALUES (${id}, ${skillId})`;

const addVacancy = vacancy =>
  `INSERT INTO vacancy (name, request_date, start_date, primary_skill, primary_skill_lvl, city, 
    status, linkedin, exp_year, english_lvl, salary_wish)
    VALUES ('${vacancy.name}', '${vacancy.request_date}','${vacancy.start_date}', '${vacancy.primary_skill}',
    ${vacancy.primary_skill_lvl}, '${vacancy.city}', ${vacancy.status},'${vacancy.linkedin}', 
    '${vacancy.exp_year}', '${vacancy.english_lvl}', '${vacancy.salary_wish}')`;

const getCandidates = (skip, vacancyId) =>
`SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name,
  candidate.eng_first_name, candidate.eng_second_name, location.city, candidate.contact_date,
  skills.skill_name, candidate_emails.email, candidate_status.status, result.total, result.primary_skill_lvl
FROM
(
  SELECT c_id , SUM (v_lvl * c_lvl) as 'total', primary_skill_lvl
  FROM 
    ( 
      SELECT c_id, v_skill_id, v_lvl, c_skill_id, c_lvl, primary_skill_lvl
      FROM
        (
          SELECT skill_id AS v_skill_id, lvl AS v_lvl
          FROM vacancy_secondary_skills
          WHERE vacancy_id =  ${vacancyId}
        ) AS vInfo
      LEFT JOIN
        (
          SELECT c_id, skill_id AS c_skill_id, lvl AS c_lvl, primary_skill_lvl
          FROM    
              (
                SELECT id AS c_id, primary_skill_lvl
                FROM candidate
                WHERE primary_skill IN (
                  SELECT primary_skill
                    FROM vacancy
                    WHERE id = ${vacancyId}
                ) 
              ) AS t2
          LEFT JOIN candidate_secondary_skills AS t1
          ON  t1.candidate_id = t2.c_id
        ) AS cInfo
      ON  vInfo.v_skill_id = cInfo.c_skill_id
    ) AS preResult
  WHERE c_id IS NOT NULL
  GROUP BY c_id 
  ORDER BY primary_skill_lvl DESC, total DESC
) AS result
LEFT JOIN candidate ON candidate.id = result.c_id
LEFT JOIN location ON candidate.city = location.id
LEFT JOIN skills ON candidate.primary_skill = skills.id
LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
LEFT JOIN candidate_emails ON candidate.id = candidate_emails.candidate_id
LIMIT ${skip}, ${capacity}`;


module.exports = {
  getVacancies,
  getVacancy,
  getOtherSkills,
  getSecondarySkills,
  getCandidates,
  generalHistory,
  commitChanges,
  updateVacancy,
  deleteOtherSkills,
  deleteSecondarySkills,
  insertOtherSkill,
  insertSecSkill,
  addVacancy,
};
