const Joi = require('joi');

const getVacancies = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    skip: Joi.number().integer().greater(-1),
    capacity: Joi.number().integer().greater(0),
    city: Joi.array().items(Joi.number().integer().less(15).greater(0)).unique(),
    primarySkill: Joi.array().items(Joi.number().integer().less(21).greater(0)).unique(),
    status: Joi.array().items(Joi.number().integer().less(10).greater(0)).unique(),
    englishLvl: Joi.array().items(Joi.number().integer().less(6).greater(0)).unique(),
    expYear: Joi.date(),
    startDate: Joi.date(),
    salaryWish: Joi.array().items(Joi.number().integer()),
  },
};

const getVacancy = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  params: {
    id: Joi.number().integer().greater(0).required(),
  },
};

const addVacancy = {
  options: {
    allowUnknownBody: true,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    name: Joi.string().required(),
    primarySkill: Joi.number().integer().less(21).greater(0)
      .required(),
    primarySkillLvl: Joi.number().integer().less(11).greater(0)
      .required(),
    city: Joi.number().integer().greater(0).less(15)
      .required(),
    status: Joi.number().integer().greater(0).less(9)
      .required(),
    secondarySkills: Joi.array().items(Joi.object().keys({
      id: Joi.number().integer().greater(0).less(32),
      lvl: Joi.number().integer().less(11).greater(0),
    })).unique(),
    otherSkills: Joi.array().items(Joi.number().integer().greater(0).less(7)).unique(),
    englishLvl: Joi.number().integer().less(6).greater(0)
      .required(),
    linkedin: Joi.string(),
    salaryWish: Joi.number().integer(),
    startDate: Joi.date().required(),
    expYear: Joi.date().required(),
    description: Joi.string(),
  },
};

const updateVacancy = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  params: {
    id: Joi.number().integer().greater(0).required(),
  },

  body: {
    name: Joi.string(),
    primarySkill: Joi.number().integer().less(21).greater(0),
    primarySkillLvl: Joi.number().integer().less(11).greater(0),
    city: Joi.number().integer().greater(0).less(15),
    status: Joi.number().integer().greater(0).less(9),
    secondarySkills: Joi.array().items(Joi.object().keys({
      id: Joi.number().integer().greater(0).less(32),
      lvl: Joi.number().integer().less(11).greater(0),
    })).unique(),
    otherSkills: Joi.array().items(Joi.number().integer().greater(0).less(7)).unique(),
    englishLvl: Joi.number().integer().less(6).greater(0),
    linkedin: Joi.string(),
    salaryWish: Joi.number().integer(),
    startDate: Joi.date(),
    expYear: Joi.date(),
    description: Joi.string(),
  },
};

const getCandidates = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  params: {
    id: Joi.number().integer().greater(0).required(),
  },
  query: {
    skip: Joi.number().integer().greater(-1),
    capacity: Joi.number().integer().greater(0),
  },
};

const getAssigned = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  params: {
    id: Joi.number().integer().greater(0).required(),
  },
  query: {
    skip: Joi.number().integer().greater(-1),
    capacity: Joi.number().integer().greater(0),
  },
};

const closeVacancy = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    vacancyId: Joi.number().integer().greater(0).required(),
    candidateId: Joi.number().integer().greater(0).required(),
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
  query: {
    skip: Joi.number().integer().greater(-1),
    capacity: Joi.number().integer().greater(0),
  },
};

const getHiringList = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  params: {
    id: Joi.number().integer().greater(0).required(),
  },
  query: {
    skip: Joi.number().integer().greater(-1),
    capacity: Joi.number().integer().greater(0),
  },
};

module.exports = {
  getVacancies,
  getVacancy,
  addVacancy,
  updateVacancy,
  getCandidates,
  getAssigned,
  getHistory,
  getHiringList,
  closeVacancy,
};
