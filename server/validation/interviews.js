const Joi = require('joi');

const getByUserId = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
};

const getByCandidateId = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    id: Joi.number().integer().required(),
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
  query: {
    user: {
      id: Joi.number().integer().required(),
    },
  },
};

const getById = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
};

const getUnclosedByUserId = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
};

module.exports = {
  getUnclosedByUserId,
  getByUserId,
  getByCandidateId,
  insert,
  getById,
};
