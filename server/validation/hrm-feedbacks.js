const Joi = require('joi');

const getById = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    feedbackid: Joi.number().integer(),
  },
};

const getByCandidateId = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    candidateid: Joi.number().integer(),
  },
};

const insert = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    changeReason: Joi.string().required(),
    readyToWork: Joi.string().required(),
    readyToTravel: Joi.string().required(),
    motivation: Joi.string().required(),
    englishLvl: Joi.number().integer().required(),
    salaryWish: Joi.number().integer().required(),
    other: Joi.string(),
    vacancyId: Joi.number().integer().required(),
    candidateId: Joi.number().integer().required(),
    interviewId: Joi.number().integer().required(),
  },
};

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
