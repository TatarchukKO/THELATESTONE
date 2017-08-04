const usersService = require('../services/users');

function get(req, res) {
  if (req.query.type !== 'HRM' && req.query.type !== 'TECH') {
    return res.status(400).send();
  }
  return usersService.get(req.query.type, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
}

module.exports = {
  get,
};
