const formChange = (key) => {
  if (key === 'name') {
    return 'Name was changed';
  }
  if (key === 'requestDate') {
    return 'Request date was changed';
  }
  if (key === 'startDate') {
    return 'Start date was changed';
  }
  if (key === 'status') {
    return 'Status was changed';
  }
  if (key === 'primarySkill') {
    return 'Primary skill was changed';
  }
  if (key === 'otherSkills') {
    return 'Other skills were changed';
  }
  if (key === 'secondarySkills') {
    return 'Secondary skills were changed';
  }
  if (key === 'secSkills') {
    return 'Secondary skills were changed';
  }
  if (key === 'city') {
    return 'City was changed';
  }
  if (key === 'expYear') {
    return 'Exp year was changed';
  }
  if (key === 'ruFirstName') {
    return 'First name (russian) was changed';
  }
  if (key === 'ruSecondName') {
    return 'Second name (rus) was changed';
  }
  if (key === 'engFirstName') {
    return 'First name (eng) was changed';
  }
  if (key === 'engSecondName') {
    return 'Second name (eng) was changed';
  }
  if (key === 'emails') {
    return 'Emails were changed';
  }
  if (key === 'linkedin') {
    return 'Linkedin was changed';
  }
  if (key === 'skype') {
    return 'Skype was changed';
  }
  if (key === 'phone') {
    return 'Phone was changed';
  }
  if (key === 'salaryWish') {
    return 'Salary wish was changed';
  }
  if (key === 'english_lvl') {
    return 'English lvl was changed';
  }
};

module.exports = {
  formChange,
};
