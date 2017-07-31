function isEng(obj) {
  if (obj.engFirstName || obj.engSecondName) {
    return true;
  }
  return false;
}

function isRu(obj) {
  if (obj.ruFirstName || obj.ruSecondName) {
    return true;
  }
  return false;
}

function deleteCandidate(obj) {
  delete obj.ruFirstName;
  delete obj.ruSecondName;
  delete obj.engFirstName;
  delete obj.engSecondName;
  return obj;
}

function edit(obj) {
  if (isRu(obj)) {
    obj.candidateName = `${obj.ruFirstName} ${obj.ruSecondName}`;
    obj = deleteCandidate(obj);
  } else if (isEng(obj)) {
    obj.candidateName = `${obj.engFirstName} ${obj.engSecondName}`;
    obj = deleteCandidate(obj);
  }
  if (obj.firstName) {
    obj.userName = `${obj.firstName} ${obj.secondName}`;
    delete obj.firstName;
    delete obj.secondName;
  }
  if (obj.name) {
    obj.vacancyName = obj.name;
    delete obj.name;
  }
  return obj;
}

function editArr(arr) {
  return arr.map(item => edit(item));
}

module.exports = {
  isEng,
  isRu,
  deleteCandidate,
  edit,
  editArr,
};
