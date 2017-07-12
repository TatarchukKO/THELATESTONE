const candidateModel = require('../models/candidate.js');

exports.getCandidates = (req, res) => {
  candidateModel.getCandidates(req.skip, req.filter, (error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
};
