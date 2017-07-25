const dateFormat = require('dateformat');

function formatDate(object) {
  const tmp = object;
  if (tmp.exp_year) {
    tmp.exp_year = dateFormat(tmp.exp_year, 'yyyy-dd-mm HH:MM:ss');
  }
  if (tmp.change_date) {
    tmp.change_date = dateFormat(tmp.change_date, 'yyyy-dd-mm HH:MM:ss');
  }
  return tmp;
}

function clearFields(item) {
  Object.keys(item).forEach((field) => {
    if (!item[field]) {
      delete item[field];
    }
  });
  return item;
}

module.exports = {
  clearFields,
  formatDate,
};
