const candidatesService = require('../services/candidates.js');

exports.getCandidates = (req, res) => {
  candidatesService.getCandidates(req.skip, req.filter, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
};

exports.getCandidateById = (req, res) => {
  candidatesService.getCandidateById(req.params.id, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
};
