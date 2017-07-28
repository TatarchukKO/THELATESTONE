const usersService = require('../services/candidates');

function get(req, res) {
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
