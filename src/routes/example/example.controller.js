const express = require('express');
const router = express.Router();
const { exampleService } = require('@services/exampleService/exampleService');
const Joi = require('@hapi/joi');
const { exampleSchema } = require('./example.controller.model');

router.post('/persons', async (req, res) => {
  const validSchema = Joi.validate(req.body, exampleSchema);

  if (validSchema.error) {
    const respInvalidDataError = {
      errors: ['invalid_data_request'],
      status: false
    };
    return res.status(422).json(respInvalidDataError);
  } else {
    let people;
    try {
      people = await exampleService.getPersons();
    } catch (error) {
      const respServerError = {
        errors: ['internal_server_error'],
        status: false
      };
      return res.status(500).json(respServerError);
    }
    const respOk = { 
      data: people,
      status: true
    };
    return res.status(200).json(respOk);
  }
});

module.exports = router;