const convertKeys = require('./utils/convert-keys');
const namesEditor = require('./utils/namesEditor.js');
const dateFormatter = require('./utils/dateFormatter');
const translit = require('./utils/translit');

function clearFields(item) {
  Object.keys(item).forEach((field) => {
    if (!item[field]) {
      delete item[field];
    }
  });
  return item;
}

module.exports = {
  toCamel: convertKeys.toCamel,
  toSnake: convertKeys.toSnake,
  dateFormatter,
  namesEditor,
  translit,
  clearFields,
};
