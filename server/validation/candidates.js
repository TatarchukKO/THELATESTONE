const Joi = require('joi');

const get = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    skip: Joi.number().integer(),
    city: Joi.number().integer(),
    salary_wish: Joi.array(),
    primary_skill: Joi.number().integer(),
    status: Joi.number().integer(),
    english_lvl: Joi.number().integer(),
    exp_year: Joi.number().integer(),
  },
};

const getById = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  params: {
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
    salary_wish: Joi.number().integer(),
    primary_skill: Joi.number().integer().required(),
    primary_skill_lvl: Joi.number().integer().required(),
    english_lvl: Joi.number().integer().required(),
    exp_year: Joi.number().integer().required(),
    emails: Joi.array(),
    sec_skills: Joi.array(),
    other_skills: Joi.array(),
    linkedin: Joi.string(),
    phone: Joi.string(),
    skype: Joi.string(),
    contact_date: Joi.string().required(),
    eng_first_name: Joi.string(),
    eng_second_name: Joi.string(),
    ru_first_name: Joi.string(),
    ru_second_name: Joi.string(),
  },
};

const update = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  params: {
    id: Joi.number().integer().required(),
  },
  body: {
    city: Joi.number().integer(),
    salary_wish: Joi.number().integer(),
    primary_skill: Joi.number().integer(),
    primary_skill_lvl: Joi.number().integer(),
    english_lvl: Joi.number().integer(),
    exp_year: Joi.number().integer(),
    emails: Joi.array(),
    sec_skills: Joi.array(),
    other_skills: Joi.array(),
    linkedin: Joi.string(),
    phone: Joi.string(),
    skype: Joi.string(),
    contact_date: Joi.string(),
    eng_first_name: Joi.string(),
    eng_second_name: Joi.string(),
    ru_first_name: Joi.string(),
    ru_second_name: Joi.string(),
    status: Joi.number().integer(),
    change_date: Joi.string().required(),
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
};

module.exports = {
  get,
  getById,
  trieSearch,
  insert,
  update,
  search,
};
