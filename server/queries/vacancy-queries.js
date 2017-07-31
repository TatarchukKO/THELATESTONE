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
      filter[key].forEach((val, j) => {
        if (j >= 1) {
          sent = ' OR ';
        }
        query[i + j] = `${sent}vacancy.${key} = ${filter[key][j]}`;
      });
    });
  }
  return `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
  skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status,
  request_date 
  FROM vacancy 
  LEFT JOIN skills ON vacancy.id = skills.id
  LEFT JOIN location ON vacancy.city = location.id
  LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id 
  ${query.join('')}
  GROUP BY vacancy.id
  ORDER BY request_date DESC
  LIMIT ${limit}, ${capacity}`;
};

/** Single Vacancy */

const getVacancy = id =>
  `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
    skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status,
    vacancy.linkedin, vacancy.exp_year, english_lvl.lvl AS vacancy_english_lvl, 
    vacancy.description, vacancy.salary_wish
    FROM vacancy 
    LEFT JOIN skills ON vacancy.id = skills.id
    LEFT JOIN location ON vacancy.city = location.id
    LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id 
    LEFT JOIN english_lvl ON english_lvl.id = vacancy.english_lvl
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

const updateVacancy = id =>
  `UPDATE vacancy SET ? WHERE id = ${id}`;

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
    status, linkedin, exp_year, english_lvl, salary_wish , description)
    VALUES ('${vacancy.name}', '${vacancy.request_date}','${vacancy.start_date}', '${vacancy.primary_skill}',
    ${vacancy.primary_skill_lvl}, '${vacancy.city}', ${vacancy.status},'${vacancy.linkedin}', 
    '${vacancy.exp_year}', '${vacancy.english_lvl}', '${vacancy.salary_wish}', '${vacancy.description}')`;

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
            RIGHT JOIN
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
    ) AS result
    LEFT JOIN candidate ON candidate.id = result.c_id
    LEFT JOIN location ON candidate.city = location.id
    LEFT JOIN skills ON candidate.primary_skill = skills.id
    LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
    LEFT JOIN candidate_emails ON candidate.id = candidate_emails.candidate_id
    GROUP BY candidate.id
    ORDER BY total DESC, primary_skill_lvl DESC, eng_first_name
    LIMIT ${skip}, ${capacity}`;

const getAssigned = (skip, vacancyId) =>
  `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name,
    candidate.eng_first_name, candidate.eng_second_name, location.city, candidate.contact_date,
    skills.skill_name, candidate_emails.email, candidate_status.status, result.date
    FROM
      (
        SELECT candidate_id AS c_id, date
        FROM interview
        WHERE vacancy_id = ${vacancyId} AND done = 0
      ) AS result
    LEFT JOIN candidate ON candidate.id = result.c_id
    LEFT JOIN location ON candidate.city = location.id
    LEFT JOIN skills ON candidate.primary_skill = skills.id
    LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
    LEFT JOIN candidate_emails ON candidate.id = candidate_emails.candidate_id
    ORDER BY date DESC`;

const changeCanidateStatus = body =>
  `UPDATE candidate SET status = 1 WHERE id = ${body.c_id}
    UPDATE interview SET done = 1 WHERE vacancy_id = ${body.v_id}`;

const getOtherCandidates = body =>
  `SELECT candidate_id
    FROM interview
    WHERE vacancy_id = ${body.v_id} AND done = 0`;

const changeOtherCandidatesStatus = candidateId =>
  `UPDATE interview SET done = 1 WHERE vacancy_id = ${candidateId}
  UPDATE candidate SET status = 9 WHERE id = ${candidateId}`;

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
  getAssigned,
  changeCanidateStatus,
  getOtherCandidates,
  changeOtherCandidatesStatus,
};
