const Joi = require('@hapi/joi');

const exampleSchema = Joi.object().keys({
  id: Joi.string().required(),
}).required();

module.exports = { exampleSchema };