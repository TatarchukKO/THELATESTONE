function insert(object) {
  return `INSERT INTO interview
  (candidate_id, vacancy_id, user_id, date)
  VALUES (
    '${object.candidate_id}', '${object.vacancy_id}',
    '${object.user_id}', '${object.date}')`;
}
function insertEventToGeneralHistory(id) {
  return `INSERT INTO general_history
  (interview_id, change_date)
  VALUES ('${id}', NOW())`;
}
function getByUserId(id) {
  return `SELECT i.candidate_id, c.ru_first_name, c.ru_second_name, c.eng_first_name, c.eng_second_name,
  i.vacancy_id, v.name, u.type, u.first_name, u.second_name, i.date
  FROM interview i
  JOIN candidate c ON i.candidate_id = c.id
  JOIN vacancy v ON i.vacancy_id = v.id
  JOIN users u ON i.user_id = u.id
  WHERE ${id} = i.user_id`;
}
function getByCandidateId(id) {
  return `SELECT i.candidate_id, c.ru_first_name, c.ru_second_name, c.eng_first_name, c.eng_second_name,
  i.vacancy_id, v.name, u.type, u.first_name, u.second_name, i.date
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
};
