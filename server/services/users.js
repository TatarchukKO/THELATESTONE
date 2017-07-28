const usersModels = require('../dao/users');

function get(type, callback) {
  return usersModels.get(type, callback);
}

module.exports = {
  get,
};
