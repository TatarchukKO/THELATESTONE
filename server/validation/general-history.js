const Joi = require('joi');

const getHistory = {
  options: {
    allowUnknownBody: true,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    skip: Joi.number().integer().greater(-1),
    capacity: Joi.number().integer().greater(0),
  },
};

module.exports = {
  getHistory,
};
