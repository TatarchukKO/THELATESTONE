const Joi = require('joi');

const get = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    skip: Joi.number().integer().greater(-1),
    amount: Joi.number().integer().greater(-1),
    city: Joi.array().items(Joi.number().integer().less(15).greater(0)).unique(),
    salaryWish: Joi.array().items(Joi.number().integer()),
    primarySkill: Joi.array().items(Joi.number().integer().less(21).greater(0)).unique(),
    status: Joi.array().items(Joi.number().integer().less(10).greater(0)).unique(),
    englishLvl: Joi.array().items(Joi.number().integer().less(6).greater(0)).unique(),
    expYear: Joi.date(),
  },
};

const getById = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    id: Joi.number().integer().greater(0).required(),
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
    city: Joi.number().integer().greater(0).less(15)
      .required(),
    salaryWish: Joi.number().integer(),
    primarySkill: Joi.number().integer().less(21).greater(0)
      .required(),
    primarySkillLvl: Joi.number().integer().less(11).greater(0)
      .required(),
    englishLvl: Joi.number().integer().less(6).greater(0)
      .required(),
    expYear: Joi.date().required(),
    emails: Joi.array().items(Joi.string().email()).unique().required(),
    secSkills: Joi.array().items(Joi.object().keys({
      skillName: Joi.number().integer().greater(0).less(32),
      lvl: Joi.number().integer().less(11).greater(0),
    })).unique(),
    otherSkills: Joi.array().items(Joi.number().integer().greater(0).less(7)).unique(),
    linkedin: Joi.string(),
    phone: Joi.string(),
    skype: Joi.string(),
    contactDate: Joi.date(),
    engFirstName: Joi.string(),
    engSecondName: Joi.string(),
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
    id: Joi.number().integer().greater(0).required(),
  },
  body: {
    city: Joi.number().integer().less(15).greater(0),
    salaryWish: Joi.number().integer(),
    primarySkill: Joi.number().integer().less(21).greater(0),
    primarySkillLvl: Joi.number().integer().less(11).greater(0),
    englishLvl: Joi.number().integer().less(6).greater(0),
    expYear: Joi.date(),
    emails: Joi.array().items(Joi.string().email()),
    secSkills: Joi.array().items(Joi.object().keys({
      skillName: Joi.number().integer().greater(0).less(32),
      lvl: Joi.number().integer().less(11).greater(0),
    })).unique(),
    otherSkills: Joi.array().items(Joi.number().integer().greater(0).less(7)).unique(),
    linkedin: Joi.string(),
    phone: Joi.string(),
    skype: Joi.string(),
    engFirstName: Joi.string(),
    engSecondName: Joi.string(),
    ruFirstName: Joi.string(),
    ruSecondName: Joi.string(),
    status: Joi.number().integer().less(10).greater(0),
  },
};

const search = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    q: Joi.string(),
  },
  body: {
    skip: Joi.number().integer().greater(-1),
    amount: Joi.number().integer().greater(-1),
    city: Joi.array().items(Joi.number().integer().less(15).greater(0)),
    salaryWish: Joi.array().items(Joi.number().integer()),
    primarySkill: Joi.array().items(Joi.number().integer().less(21).greater(0)),
    status: Joi.array().items(Joi.number().integer().less(10).greater(0)).unique(),
    englishLvl: Joi.array().items(Joi.number().integer().less(6).greater(0)).unique(),
    expYear: Joi.date(),
  },
};

const report = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    span: Joi.array().items(Joi.date()),
    city: Joi.array().items(Joi.number().integer().less(15).greater(0)).unique(),
    salaryWish: Joi.array().items(Joi.number().integer()),
    primarySkill: Joi.array().items(Joi.number().integer().less(21).greater(0)).unique(),
    status: Joi.array().items(Joi.number().integer().less(10).greater(0)).unique(),
    englishLvl: Joi.array().items(Joi.number().integer().less(6).greater(0)).unique(),
    expYear: Joi.date(),
  },
};


const getHistory = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  params: {
    id: Joi.number().integer().greater(0).required(),
  },
};

module.exports = {
  get,
  getById,
  getHistory,
  trieSearch,
  insert,
  update,
  search,
  report,
};
