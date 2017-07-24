const convertKeys = require('convert-keys');
const dateFormat = require('dateformat');

/* function toCamel(obj) {
  return obj.map(item => convertKeys.toCamel(item));
} */
function formatDate(object) {
  object.date = dateFormat(object.date, 'yyyy-dd-mm HH:MM:ss');
}
const toSnake = obj => convertKeys.toSnake(obj);
const toCamel = obj => obj.map(item => convertKeys.toCamel(item));

module.exports = {
  toCamel,
  toSnake,
  formatDate,
};
