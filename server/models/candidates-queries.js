function get(skip = 0, filter = '') {
  return `SELECT candidate.id, candidate.ru_first_name, candidate.ru_second_name,
  candidate.eng_first_name, candidate.eng_second_name, location.city, candidate.contact_date,
  skills.skill_name, candidate_emails.email, candidate_status.status FROM candidate
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN candidate_emails ON candidate.id = candidate_emails.candidate_id
  ${filter}
  GROUP BY candidate.id
  LIMIT ${skip}, 7`;
}

function getById(id) {
  return `SELECT candidate.id, candidate.eng_first_name, 
  candidate.eng_second_name, candidate.linkedin, candidate.skype, candidate.phone,  location.city, 
  candidate.exp_year, candidate.salary_wish, english_lvl.lvl, candidate.contact_date, 
  skills.skill_name, candidate.primary_skill_lvl, candidate_status.status FROM candidate
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN english_lvl ON candidate.english_lvl = english_lvl.id
  WHERE candidate.id = ${id}`;
}

function getEmails(id) {
  return `SELECT candidate_emails.email FROM candidate_emails
  WHERE candidate_emails.candidate_id = ${id}`;
}

function getSecondarySkills(id) {
  return `SELECT skills.skill_name, candidate_secondary_skills.lvl 
  FROM candidate_secondary_skills
  LEFT JOIN skills ON candidate_secondary_skills.skill_id = skills.id
  WHERE candidate_secondary_skills.candidate_id = ${id}`;
}

function getOtherSkills(id) {
  return `SELECT other_skills.skill 
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

function update(id) {
  return `UPDATE candidate
    SET ?
    WHERE id = ${id}`;
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

function commitChanges() {
  return 'INSERT INTO candidate_changes SET ?';
}

function generalHistory(id, date) {
  return `INSERT INTO general_history (candidate_change_id, change_date)
    VALUES (${id}, "${date}");`;
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
  update,
  deleteEmails,
  deleteSecSkills,
  deleteOtherSkills,
  commitChanges,
  generalHistory,
};
