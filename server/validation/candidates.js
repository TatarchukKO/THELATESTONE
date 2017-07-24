const Joi = require('joi');

const get = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    skip: Joi.number().integer(),
    city: Joi.array(),
    salaryWish: Joi.array(),
    primarySkill: Joi.array(),
    status: Joi.array(),
    englishLvl: Joi.array(),
    expYear: Joi.string(),
  },
};

const getById = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    id: Joi.number().integer(),
  },
};

const trieSearch = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    candidate: Joi.string().required(),
  },
};

const insert = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    city: Joi.number().integer().required(),
    salaryWish: Joi.number().integer(),
    primarySkill: Joi.number().integer().required(),
    primarySkill_lvl: Joi.number().integer().required(),
    englishLvl: Joi.number().integer().required(),
    expYear: Joi.string().required(),
    emails: Joi.array(),
    secSkills: Joi.array(),
    otherSkills: Joi.array(),
    linkedin: Joi.string(),
    phone: Joi.string(),
    skype: Joi.string(),
    contactDate: Joi.string(),
    engFirstName: Joi.string(),
    enSecondName: Joi.string(),
    ruFirstName: Joi.string(),
    ruSecondName: Joi.string(),
  },
};

const update = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    id: Joi.number().integer().required(),
  },
  body: {
    city: Joi.number().integer(),
    salaryWish: Joi.number().integer(),
    primarySkill: Joi.number().integer(),
    primarySkill_lvl: Joi.number().integer(),
    englishLvl: Joi.number().integer(),
    expYear: Joi.number().integer(),
    emails: Joi.array(),
    secSkills: Joi.array(),
    otherSkills: Joi.array(),
    linkedin: Joi.string(),
    phone: Joi.string(),
    skype: Joi.string(),
    contact_date: Joi.string(),
    engFirstName: Joi.string(),
    engSecondName: Joi.string(),
    ruFirstName: Joi.string(),
    ruSecondName: Joi.string(),
    status: Joi.number().integer(),
    changeDate: Joi.string().required(),
  },
};

const search = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    candidate: Joi.string().required(),
  },
  body: {
    skip: Joi.number().integer(),
    city: Joi.array(),
    salaryWish: Joi.array(),
    primarySkill: Joi.array(),
    status: Joi.array(),
    englishLvl: Joi.array(),
    expYear: Joi.string(),
  },
};

module.exports = {
  get,
  getById,
  trieSearch,
  insert,
  update,
  search,
};
