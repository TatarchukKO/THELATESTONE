function getUpcomingInterviews(id, currentTime, timeLimit) {
  return `SELECT i.candidate_id, c.ru_first_name,
  c.ru_second_name, c.eng_first_name, c.eng_second_name,
  i.vacancy_id, v.name, u.type, u.first_name,
  u.second_name, i.date, i.done
  FROM interview i
  JOIN candidate c ON i.candidate_id = c.id
  JOIN vacancy v ON i.vacancy_id = v.id
  JOIN users u ON i.user_id = u.id
  WHERE 
  ${id} = i.user_id 
  AND
  i.done = 0 
  AND
  i.date >= '${currentTime}'
  AND
  i.date <= '${timeLimit}'`;
}

module.exports = {
  getUpcomingInterviews,
};
