const app = require('~/index');
const request = require('supertest');
const { exampleService } = require('@services/exampleService/exampleService');

describe('example', () => {
  test('#getPersons devuelve (200)', async done => {
    const people = [
      {
        name: 'Marlon',
        lastName: 'Conrado'
      }
    ];
    exampleService.getPersons = jest.fn().mockImplementation(() => {
      return Promise.resolve(people);
    });
    const response = await request(app).post('/persons').send({ name: 'Marlon', lastName: 'Conrado' });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toEqual(people);
    done();
  });

  test('#getPersons devuelve error (422)', async done => {
    const people = [
      {
        name: 'Marlon',
        lastName: 'Conrado'
      }
    ];
    exampleService.getPersons = jest.fn().mockImplementation(() => {
      return Promise.resolve(people);
    });
    const response = await request(app).post('/persons').send({});
    expect(response.status).toBe(422);
    expect(response.body.status).toBe(false);
    expect(response.body.errors).toContain('invalid_data_request');
    done();
  });

  test('#getPersons devuelve error (500)', async done => {
    exampleService.getPersons = jest.fn().mockImplementation(() => {
      return Promise.reject('internal_error_server');
    });
    const response = await request(app).post('/persons').send({ name: 'Marlon', lastName: 'Conrado' });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(false);
    expect(response.body.errors).toContain('internal_server_error');
    done();
  });
});