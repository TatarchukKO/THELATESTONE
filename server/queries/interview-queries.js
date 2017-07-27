function insert(object) {
  return `INSERT INTO interview
  (candidate_id, vacancy_id, user_id, date, done)
  VALUES (
    '${object.candidate_id}', '${object.vacancy_id}',
    '${object.user_id}', '${object.date}', 0)`;
}
function getEmailNotificationData(id) {
  return `SELECT u.first_name, u.second_name,
  u.login, u.type, i.date, v.name, s.skill_name,
  c.ru_first_name, c.ru_second_name,
  c.eng_first_name, c.eng_second_name
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
function getByUserId(id, currentTime) {
  return `SELECT c.ru_first_name, c.ru_second_name,
  c.eng_first_name, c.eng_second_name, i.date
  FROM interview i
  JOIN candidate c ON i.candidate_id = c.id
  JOIN users u ON i.user_id = u.id
  WHERE 
  ${id} = i.user_id
  AND
  '${currentTime}' <= i.date`;
}
function getByCandidateId(id) {
  return `SELECT i.candidate_id, c.ru_first_name,
  c.ru_second_name, c.eng_first_name, c.eng_second_name,
  i.vacancy_id, v.name, u.type, u.first_name,
  u.second_name, i.date, i.done
  FROM interview i
  JOIN candidate c ON i.candidate_id = c.id
  JOIN vacancy v ON i.vacancy_id = v.id
  JOIN users u ON i.user_id = u.id
  WHERE ${id} = i.candidate_id`;
}

module.exports = {
  insert,
  insertEventToGeneralHistory,
  getByUserId,
  getByCandidateId,
  getEmailNotificationData,
};
