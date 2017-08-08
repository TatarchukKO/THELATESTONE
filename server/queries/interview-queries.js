function insert(object) {
  return `INSERT INTO interview
  (candidate_id, vacancy_id, user_id, assigner_id, date, done)
  VALUES (
    '${object.candidate_id}', '${object.vacancy_id}',
    '${object.user_id}', '${object.assigner_id}', '${object.date}', 0)`;
}

function getEmailNotificationData(id) {
  return `SELECT
  u.first_name, u.second_name,
  c.eng_first_name, c.eng_second_name,
  u.login, u.type,
  i.date,
  v.name,
  s.skill_name
  FROM interview i
  LEFT JOIN vacancy v ON v.id = i.vacancy_id
  LEFT JOIN skills s ON v.primary_skill = s.id
  LEFT JOIN users u ON u.id = i.user_id
  LEFT JOIN candidate c ON c.id = i.candidate_id
  WHERE ${id} = i.id`;
}

function insertEventToGeneralHistory(id) {
  return `INSERT INTO general_history
  (interview_id)
  VALUES ('${id}')`;
}

function getByUserId(id) {
  return `SELECT
  i.date, 
  c.ru_first_name, c.ru_second_name,
  c.eng_first_name, c.eng_second_name
  FROM interview i
  JOIN candidate c ON i.candidate_id = c.id
  JOIN users u ON i.user_id = u.id
  WHERE ${id} = i.user_id
  ORDER BY i.date DESC`;
}

function getByCandidateId(id) {
  return `SELECT
  v.name,
  i.id, i.vacancy_id,
  i.date, i.done, i.user_id,
  u.type, u.first_name, u.second_name
  FROM interview i
  JOIN candidate c ON i.candidate_id = c.id
  JOIN vacancy v ON i.vacancy_id = v.id
  JOIN users u ON i.user_id = u.id
  WHERE ${id} = i.candidate_id
  ORDER BY i.date DESC`;
}

function getUserId(id) {
  return `SELECT i.user_id
  FROM interview i
  WHERE ${id} = i.id`;
}

function getUnclosedByUserId(id) {
  return `SELECT
  i.date, 
  c.ru_first_name, c.ru_second_name,
  c.eng_first_name, c.eng_second_name,
  v.name
  FROM interview i
  JOIN candidate c ON i.candidate_id = c.id
  JOIN users u ON i.user_id = u.id
  JOIN vacancy v ON v.id = i.vacancy_id
  WHERE
  ${id} = i.user_id
  AND 
  i.done = 0
  ORDER BY i.date DESC`;
}

module.exports = {
  getUserId,
  insert,
  insertEventToGeneralHistory,
  getUnclosedByUserId,
  getByUserId,
  getByCandidateId,
  getEmailNotificationData,
};
