function get(skip = 0, filter = {}) {
  const query = [];
  let sent = 'WHERE ';
  Object.keys(filter).forEach((item, i) => {
    if (i === 1) {
      sent = ' AND ';
    }
    if (item === 'salary_wish') {
      query[i] = `${sent}candidate.${item} >= ${filter[item][0]} 
        AND candidate.${item} <= ${filter[item][1]}`;
      return;
    }
    if (item === 'exp_year') {
      query[i] = `${sent}candidate.${item} <= ${filter[item][0]}`;
      return;
    }
    filter[item].forEach((val, j) => {
      query[i + j] = `${sent}candidate.${item} = ${filter[item]}`;
    });
  });
  return `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name,
  candidate.eng_first_name, candidate.eng_second_name, location.city, candidate.contact_date,
  skills.skill_name, candidate_emails.email, candidate_status.status
  FROM candidate
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN candidate_emails ON candidate.id = candidate_emails.candidate_id
  ${query.join('')}
  GROUP BY candidate.id
  LIMIT ${skip}, 7`;
}

function getById(id) {
  return `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name, 
  candidate.eng_first_name, candidate.eng_second_name, candidate.linkedin, candidate.skype,
  candidate.phone,  location.city, candidate.exp_year, candidate.salary_wish, english_lvl.lvl,
  candidate.contact_date, skills.skill_name, candidate.primary_skill_lvl, 
  candidate_status.status 
  FROM candidate
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN english_lvl ON candidate.english_lvl = english_lvl.id
  WHERE candidate.id = ${id}`;
}

function getEmails(id) {
  return `SELECT candidate_emails.email
  FROM candidate_emails
  WHERE candidate_emails.candidate_id = ${id}`;
}

function getSecondarySkills(id) {
  return `SELECT skills.id, skills.skill_name, candidate_secondary_skills.lvl 
  FROM candidate_secondary_skills
  LEFT JOIN skills ON candidate_secondary_skills.skill_id = skills.id
  WHERE candidate_secondary_skills.candidate_id = ${id}`;
}

function getOtherSkills(id) {
  return `SELECT other_skills.skill, other_skills.id 
  FROM other_skills_has_candidate
  LEFT JOIN other_skills ON other_skills_has_candidate.other_skills_id = other_skills.id
  WHERE other_skills_has_candidate.candidate_id = ${id}`;
}

function insert() {
  return 'INSERT INTO candidate SET ?;';
}

function insertEmails(id, email) {
  return `INSERT INTO candidate_emails (candidate_id, email)
    VALUES (${id}, "${email}");`;
}

function insertSecSkills(id, skill) {
  return `INSERT INTO candidate_secondary_skills (candidate_id, skill_id, lvl)
    VALUES (${id}, ${skill.skill_name}, ${skill.lvl});`;
}

function insertOtherSkills(id, skill) {
  return `INSERT INTO other_skills_has_candidate (candidate_id, other_skills_id)
    VALUES (${id}, ${skill});`;
}

function insertMeta() {
  return 'INSERT INTO metaphone SET ?';
}

function update(id) {
  return `UPDATE candidate
    SET ?
    WHERE id = ${id}`;
}

function deleteRuName(id) {
  return `UPDATE candidate
    SET ru_first_name = NULL, ru_second_name = NULL
    WHERE candidate.id = ${id}`;
}

function deleteEmails(id) {
  return `DELETE FROM candidate_emails
    WHERE candidate_id = ${id};`;
}

function deleteSecSkills(id) {
  return `DELETE FROM candidate_secondary_skills
    WHERE candidate_id = ${id};`;
}

function deleteOtherSkills(id) {
  return `DELETE FROM other_skills_has_candidate
    WHERE candidate_id = ${id};`;
}

function deleteMeta(id) {
  return `DELETE FROM metaphone
    WHERE candidate_id = ${id};`;
}

function commitChanges() {
  return 'INSERT INTO candidate_changes SET ?';
}

function generalHistory(id, date) {
  return `INSERT INTO general_history (candidate_change_id, change_date)
    VALUES (${id}, "${date}");`;
}

function search(params, skip = 0, filter = {}) {
  const query = [];
  let index = 2;
  query[0] = `metaphone.first = "${params[0]}"`;
  if (params[1]) {
    query[1] = ` AND metaphone.second = "${params[1]}"`;
    query[3] = ` AND metaphone.first = "${params[1]}"`;
    query[2] = ` OR metaphone.second = "${params[0]}"`;
    index = 4;
  } else {
    query[1] = ` OR metaphone.second = "${params[0]}"`;
  }
  Object.keys(filter).forEach((item, i) => {
    if (item === 'salary_wish') {
      query[i + index] = ` AND candidate.${item} >= ${filter[item][0]} 
        AND candidate.${item} <= ${filter[item][1]}`;
      return;
    }
    if (item === 'exp_year') {
      query[i + index] = ` AND candidate.${item} <= ${filter[item][0]}`;
      return;
    }
    query[i + index] = ` AND candidate.${item} = ${filter[item]}`;
  });
  return `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name, 
  candidate.eng_first_name, candidate.eng_second_name, location.city, candidate.contact_date, 
  skills.skill_name, candidate.primary_skill_lvl, candidate_status.status 
  FROM metaphone
  LEFT JOIN candidate ON metaphone.candidate_id = candidate.id
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN english_lvl ON candidate.english_lvl = english_lvl.id
  WHERE ${query.join('')}
  LIMIT ${skip}, 7`;
}

function searchByEmail(params, skip = 0, filter = {}) {
  const query = [];
  query[0] = `candidate_emails.email = "${params}"`;
  Object.keys(filter).forEach((item, i) => {
    if (item === 'salary_wish') {
      query[i + 1] = ` AND candidate.${item} >= ${filter[item][0]} 
        AND candidate.${item} <= ${filter[item][1]}`;
      return;
    }
    if (item === 'exp_year') {
      query[i + 1] = ` AND candidate.${item} <= ${filter[item][0]}`;
      return;
    }
    query[i + 1] = ` AND candidate.${item} = ${filter[item]}`;
  });
  return `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name, 
  candidate.eng_first_name, candidate.eng_second_name, location.city, candidate.contact_date, 
  skills.skill_name, candidate.primary_skill_lvl, candidate_status.status 
  FROM candidate_emails
  LEFT JOIN candidate ON candidate_emails.candidate_id = candidate.id
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN english_lvl ON candidate.english_lvl = english_lvl.id
  WHERE ${query.join('')}
  LIMIT ${skip}, 7`;
}

function searchBySkype(params, skip = 0, filter = {}) {
  const query = [];
  query[0] = `candidate.skype = "${params}"`;
  Object.keys(filter).forEach((item, i) => {
    if (item === 'salary_wish') {
      query[i + 1] = ` AND candidate.${item} >= ${filter[item][0]} 
        AND candidate.${item} <= ${filter[item][1]}`;
      return;
    }
    if (item === 'exp_year') {
      query[i + 1] = ` AND candidate.${item} <= ${filter[item][0]}`;
      return;
    }
    query[i + 1] = ` AND candidate.${item} = ${filter[item]}`;
  });
  return `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name, 
  candidate.eng_first_name, candidate.eng_second_name, location.city, candidate.contact_date, 
  skills.skill_name, candidate.primary_skill_lvl, candidate_status.status 
  FROM candidate
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN english_lvl ON candidate.english_lvl = english_lvl.id
  WHERE ${query.join('')}
  LIMIT ${skip}, 7`;
}

module.exports = {
  get,
  getById,
  getEmails,
  getSecondarySkills,
  getOtherSkills,
  insert,
  insertEmails,
  insertSecSkills,
  insertOtherSkills,
  insertMeta,
  update,
  deleteRuName,
  deleteEmails,
  deleteSecSkills,
  deleteOtherSkills,
  deleteMeta,
  commitChanges,
  generalHistory,
  search,
  searchByEmail,
  searchBySkype,
};
