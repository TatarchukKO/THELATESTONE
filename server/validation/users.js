const Joi = require('joi');

const users = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  query: {
    type: Joi.string(),
  },
};

module.exports = {
  users,
};
