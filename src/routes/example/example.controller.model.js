const Joi = require('@hapi/joi');

const exampleSchema = Joi.object().keys({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
}).required();

module.exports = { exampleSchema };