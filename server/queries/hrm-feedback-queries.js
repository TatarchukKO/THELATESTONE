function getByCandidateId(id) {
  return `SELECT h_f.id, u.first_name, u.second_name,
  i.date, v.name, c.ru_first_name, c.ru_second_name,
  c.eng_first_name, c.eng_second_name
  FROM hrm_feedback h_f
  LEFT JOIN users u ON h_f.user_id = u.id
  LEFT JOIN vacancy v ON v.id = h_f.vacancy_id
  LEFT JOIN interview i ON i.id = h_f.interview_id
  LEFT JOIN candidate c ON c.id = h_f.candidate_id
  WHERE ${id} = h_f.candidate_id`;
}
function getById(id) {
  return `SELECT u.first_name, u.second_name, v.name,
  h_f.change_reason, h_f.ready_to_work, h_f.ready_to_travel,
  h_f.motivation, e_l.lvl, h_f.salary_wish, h_f.other,
  c.ru_first_name, c.ru_second_name,
  c.eng_first_name, c.eng_second_name
  FROM hrm_feedback h_f
  LEFT JOIN interview i ON i.id = h_f.interview_id
  LEFT JOIN vacancy v ON v.id = i.vacancy_id
  LEFT JOIN users u ON u.id = i.user_id
  LEFT JOIN english_lvl e_l ON e_l.id = h_f.english_lvl
  LEFT JOIN candidate c ON c.id = i.candidate_id
  WHERE ${id} = h_f.id`;
}
function insert() {
  return 'INSERT INTO hrm_feedback SET ?';
}
function updateInterviewStatus(object) {
  return `UPDATE interview
  SET done = 1
  WHERE ${object.interview_id} = id`;
}
function insertEventToGeneralHistory(id) {
  return `INSERT INTO general_history
  (hrm_feedback_id)
  VALUES ('${id}')`;
}

module.exports = {
  updateInterviewStatus,
  getById,
  getByCandidateId,
  insert,
  insertEventToGeneralHistory,
};
