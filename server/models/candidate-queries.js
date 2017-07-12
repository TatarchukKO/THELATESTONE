exports.getCandidates = (skip = 0, filter = '') => `SELECT candidate.id, candidate.eng_first_name, 
  candidate.eng_second_name, location.city, candidate.contact_date, skills.skill_name, 
  candidate_emails.email, candidate_status.status FROM candidate
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN candidate_emails ON candidate.id = candidate_emails.candidate_id
  ${filter}
  GROUP BY candidate.id
  LIMIT ${skip}, 5`;

exports.getCandidateById = id => `SELECT candidate.id, candidate.eng_first_name, 
  candidate.eng_second_name, candidate.linkedin, candidate.skype, candidate.phone,  location.city, 
  candidate.exp_year, candidate.salary_wish, english_lvl.lvl, candidate.contact_date, 
  skills.skill_name, candidate.primary_skill_lvl, candidate_status.status FROM candidate
  LEFT JOIN location ON candidate.city = location.id
  LEFT JOIN skills ON candidate.primary_skill = skills.id
  LEFT JOIN candidate_status ON candidate.status = candidate_status.id 
  LEFT JOIN english_lvl ON candidate.english_lvl = english_lvl.id
  WHERE candidate.id = ${id}`;

exports.getCandidateEmails = id => `SELECT candidate_emails.email FROM candidate_emails
  WHERE candidate_emails.candidate_id = ${id}`;
