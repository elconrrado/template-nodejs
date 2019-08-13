const express = require('express');
const router = express.Router();
const { exampleService } = require('@services/exampleService/exampleService');
const Joi = require('@hapi/joi');
const { exampleSchema } = require('./example.controller.model');

router.post('/persons', async (req, res) => {
  const validSchema = Joi.validate(req.body, exampleSchema);

  // Valida que el request enviado cumpla con el formato
  if (validSchema.error) {
    const respInvalidDataError = {
      errors: ['invalid_data_request'],
      status: false
    };
    return res.status(422).json(respInvalidDataError);
  }
  let result;
  try {
    result = await exampleService.getPersonById(validSchema.value);
  } catch (error) {
    const respServerError = {
      errors: ['internal_server_error'],
      status: false
    };
    return res.status(500).json(respServerError);
  }
  // Si el resultado está vacío
  if (!result) {
    const respOk = { 
      data: 'Person not found',
      status: true
    };
    return res.status(200).json(respOk);
  } else {
    const respOk = { 
      data: result,
      status: true
    };
    return res.status(200).json(respOk);
  }
  
});

module.exports = router;