const Joi = require('joi');

const getByUserId = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    userid: Joi.number().integer().required(),
  },
};

const getByCandidateId = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    candidateid: Joi.number().integer().required(),
  },
};

const insert = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    candidateId: Joi.number().integer().required(),
    vacancyId: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
    date: Joi.number().integer().required(),
  },
};

module.exports = {
  getByUserId,
  getByCandidateId,
  insert,
};
