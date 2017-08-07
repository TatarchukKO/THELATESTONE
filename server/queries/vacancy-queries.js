/** All Vacancies */

function formQuery(filter) {
  const query = [];
  let sent = 'WHERE ';
  let j = 0;
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
      query[i + j] = `${sent}vacancy.${key} IN (`;
      filter[key].forEach((val, l, arr) => {
        j += 1;
        if (l !== arr.length - 1) {
          query[i + j] = `"${val}",`;
          return;
        }
        query[i + j] = `"${val}"`;
      });
      j += 1;
      query[i + j] = ')';
    });
    return query.join('');
  }
}

function getVacancies(skip, capacity, filter) {
  return `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
    skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status,
    request_date 
    FROM vacancy 
    LEFT JOIN skills ON vacancy.primary_skill = skills.id
    LEFT JOIN location ON vacancy.city = location.id
    LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id 
    ${formQuery(filter)}
    GROUP BY vacancy.id
    ORDER BY request_date DESC
    LIMIT ${skip}, ${capacity}`;
}

function getVacancy(id) {
  return `SELECT vacancy.id, vacancy.name, vacancy.request_date, vacancy.start_date,
    skills.skill_name,  vacancy.primary_skill_lvl, location.city, vacancy_status.status,
    vacancy.linkedin, vacancy.exp_year, english_lvl.lvl AS vacancy_english_lvl, 
    vacancy.description, vacancy.salary_wish
    FROM vacancy 
    LEFT JOIN skills ON vacancy.primary_skill = skills.id
    LEFT JOIN location ON vacancy.city = location.id
    LEFT JOIN vacancy_status ON vacancy.status = vacancy_status.id 
    LEFT JOIN english_lvl ON english_lvl.id = vacancy.english_lvl
    WHERE vacancy.id = ${id}`;
}

function getSecondarySkills(id) {
  return `SELECT skills.skill_name, vacancy_secondary_skills.lvl
    FROM vacancy_secondary_skills
    LEFT JOIN skills ON vacancy_secondary_skills.skill_id = skills.id
    WHERE  vacancy_secondary_skills.vacancy_id = ${id}`;
}

function getOtherSkills(id) {
  return `SELECT other_skills.skill, other_skills.id 
    FROM other_skills_has_vacancy
    LEFT JOIN other_skills ON other_skills_has_vacancy.other_skills_id = other_skills.id
    WHERE other_skills_has_vacancy.vacancy_id = ${id}`;
}

function updateVacancy(id) {
  return `UPDATE vacancy SET ? WHERE id = ${id}`;
}

function deleteSecondarySkills(id) {
  return `DELETE FROM vacancy_secondary_skills WHERE vacancy_id = ${id}`;
}

function insertSecSkill(id, skill) {
  return `INSERT INTO vacancy_secondary_skills (vacancy_id, skill_id, lvl)
    VALUES (${id}, ${skill.id}, ${skill.lvl})`;
}

function commitChanges() {
  return 'INSERT INTO vacancy_changes SET ?';
}

function generalHistory(id) {
  return `INSERT INTO general_history (vacancy_change_id)
    VALUES (${id})`;
}

function deleteOtherSkills(id) {
  return `DELETE FROM other_skills_has_vacancy WHERE vacancy_id = ${id}`;
}

function insertOtherSkill(id, skillId) {
  return `INSERT INTO other_skills_has_vacancy (vacancy_id, other_skills_id)
    VALUES (${id}, ${skillId})`;
}

function addVacancy(vacancy) {
  return `INSERT INTO vacancy (name, request_date, start_date, primary_skill, primary_skill_lvl, city, 
    status, linkedin, exp_year, english_lvl, salary_wish , description)
    VALUES ('${vacancy.name}', '${vacancy.request_date}','${vacancy.start_date}', '${vacancy.primary_skill}',
    ${vacancy.primary_skill_lvl}, '${vacancy.city}', ${vacancy.status},'${vacancy.linkedin}', 
    '${vacancy.exp_year}', '${vacancy.english_lvl}', '${vacancy.salary_wish}', '${vacancy.description}')`;
}

function getCandidates(skip, capacity, vacancyId) {
  return `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name,
    candidate.eng_first_name, candidate.eng_second_name, location.city, candidate.contact_date,
    skills.skill_name, candidate_emails.email, candidate_status.status, result.total, result.primary_skill_lvl
    FROM
    (
    SELECT c_id , (v_lvl * c_lvl )  as 'total', primary_skill_lvl
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
    ORDER BY  total DESC, primary_skill_lvl DESC, eng_first_name
    LIMIT ${skip}, ${capacity}`;
}

function getAssigned (skip, capacity, vacancyId) {
  return `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name,
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
    GROUP BY candidate.id
    ORDER BY date DESC
    LIMIT ${skip}, ${capacity}`;
}

function getHiringList(skip, capacity, vacancyId) {
  return `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name,
    candidate.eng_first_name, candidate.eng_second_name
    FROM
      (
        SELECT candidate_id AS c_id, date
        FROM interview
        WHERE vacancy_id = ${vacancyId} AND done = 1
      ) AS result
    LEFT JOIN candidate ON candidate.id = result.c_id
    WHERE candidate.status != 9
    GROUP BY candidate.id
    ORDER BY date DESC
    LIMIT ${skip}, ${capacity}`;
}

function changeCandidateStatus(body) {
  return `UPDATE candidate SET status = 9 WHERE id = ${body.candidateId}`;
}

function changeInterviewStatus(body) {
  return `UPDATE interview SET done = 1 WHERE vacancy_id = ${body.vacancyId}`;
}

function getOtherCandidates(body) {
  return `SELECT candidate_id
    FROM interview
    WHERE vacancy_id = ${body.vacancyId} AND done = 0`;
}

function changeOtherCandidatesStatus(candidateId) {
  return `UPDATE interview SET done = 1 WHERE vacancy_id = ${candidateId}
    UPDATE candidate SET status = 9 WHERE id = ${candidateId}`;
}

function getHistory(vacancyId) {
  return `SELECT users.first_name, users.second_name, change_date, name, request_date, start_date, status,
    primary_skill, other_skills, city, secondary_skills, exp_year
    FROM vacancy_changes
    LEFT JOIN users ON users.id = vacancy_changes.user_id
    WHERE vacancy_id = ${vacancyId}
    ORDER BY change_date DESC`;
}

function getVacancyTotal(id) {
  return `SELECT SUM (lvl) AS lvl_res, vacancy_id, vacancy.primary_skill_lvl
    FROM vacancy_secondary_skills
    LEFT JOIN vacacncy ON vacancy.id = vacancy_id
    WHERE vacancy_id =  ${id} `;
}

module.exports = {
  getVacancies,
  getVacancy,
  getOtherSkills,
  getSecondarySkills,
  getCandidates,
  getAssigned,
  getHistory,
  getOtherCandidates,
  generalHistory,
  getHiringList,
  getVacancyTotal,
  commitChanges,
  updateVacancy,
  deleteOtherSkills,
  deleteSecondarySkills,
  insertOtherSkill,
  insertSecSkill,
  addVacancy,
  changeCandidateStatus,
  changeOtherCandidatesStatus,
  changeInterviewStatus,
};
