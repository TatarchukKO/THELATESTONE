exports.getCandidates = (skip = 0, filter = '') => `SELECT candidate.id, candidate.eng_first_name, 
  candidate.eng_second_name, location.city, candidate.contact_date, skills.skill_name, 
  candidate_emails.email, candidate_status.status FROM candidate
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN candidate_emails ON candidate.id = candidate_emails.candidate_id
  ${filter}
  GROUP BY candidate.id
  LIMIT ${skip}, ${skip + 5}`;
