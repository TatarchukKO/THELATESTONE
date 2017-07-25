const Joi = require('joi');

const getById = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    feedbackid: Joi.number().integer().required(),
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
    primarySkillId: Joi.number().integer().required(),
    primarySkillLvl: Joi.number().integer().required(),
    candidateId: Joi.number().integer().required(),
    vacancyId: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
    interviewId: Joi.number().integer().required(),
    secondarySkills: Joi.array().required(),
  },
};

module.exports = {
  getById,
  getByCandidateId,
  insert,
};
