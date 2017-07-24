function englishLevelsQuery() { return 'SELECT * FROM english_lvl'; }
function locationQuery() { return 'SELECT * FROM location'; }
function skillsQuery() { return 'SELECT * FROM skills LIMIT 20'; }
function candidateStatusesQuery() { return 'SELECT * FROM candidate_status'; }
function otherSkillsQuery() { return 'SELECT * FROM other_skills'; }
function vacancyStatusesQuery() { return 'SELECT * FROM vacancy_status'; }

module.exports = {
  englishLevelsQuery,
  locationQuery,
  skillsQuery,
  candidateStatusesQuery,
  otherSkillsQuery,
  vacancyStatusesQuery,
};
