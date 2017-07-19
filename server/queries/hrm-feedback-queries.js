function getByCandidateId(id) {
  return `SELECT u.first_name, u.second_name, v.name, h_f.change_reason,
  h_f.ready_to_work, h_f.ready_to_travell, h_f.motivation, e_l.lvl, h_f.salary_wish, h_f.other
  FROM hrm_feedback h_f
  LEFT JOIN users u ON u.id = h_f.user_id
  LEFT JOIN english_lvl e_l ON h_f.english_lvl = e_l.id
  LEFT JOIN vacancy v ON v.id = h_f.vacancy_id
  WHERE ${id} = h_f.candidate_id`;
}
function insert(object) {
  return `INSERT INTO hrm_feedback (change_reason, ready_to_work, ready_to_travell,
  motivation, english_lvl, salary_wish, other, vacancy_id, user_id, candidate_id)
  VALUES ('${object.change_reason}', '${object.ready_to_work}', '${object.ready_to_travell}',
    '${object.motivation}', '${object.english_lvl}', '${object.salary_wish}',
    '${object.other}', '${object.vacancy_id}', '${object.user_id}', '${object.candidate_id}')`;
}
function insertEventToGeneralHistory(id) {
  return `INSERT INTO general_history (hrm_feedback_id, change_date)
  VALUES ('${id}', NOW())`;
}

module.exports = {
  getByCandidateId,
  insert,
  insertEventToGeneralHistory,
};
