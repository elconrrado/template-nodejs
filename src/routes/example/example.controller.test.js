const app = require('~/index');
const request = require('supertest');
const { exampleService } = require('@services/exampleService/exampleService');

describe('example', () => {
  test('Servicio da error invalid request [status => (422)]', async () => {
    const result = await request(app).post('/persons').send({});
    expect(result.status).toBe(422);
    expect(result.body).toBeDefined();
    expect(result.body.errors).toContain('invalid_data_request');
    expect(result.body.status).toBe(false);
  });

  test('Servicio encuentra persona [status => (200)]', async () => {
    const respPerson = {
      id: '11111111',
      name: 'Luigi',
      lastName: 'Conrado'
    };
    exampleService.getPersonById = jest.fn().mockImplementation(() => Promise.resolve(respPerson));
    const result = await request(app).post('/persons').send({ id: '11111111' });
    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
    expect(result.body.data).toEqual(respPerson);
    expect(result.body.status).toBe(true);
  });

  test('Servicio no encuentra persona [status => (200)]', async () => {
    const respPerson = null;
    exampleService.getPersonById = jest.fn().mockImplementation(() => Promise.resolve(respPerson));
    const result = await request(app).post('/persons').send({ id: '11111111' });
    expect(result.status).toBe(200);
    expect(result.body).toBeDefined();
    expect(result.body.data).toBe('Person not found');
    expect(result.body.status).toBe(true);
  });

  test('Servicio no responde [status => (500)]', async () => {
    exampleService.getPersonById = jest.fn().mockImplementation(() => Promise.reject('internal_server_error'));
    const result = await request(app).post('/persons').send({ id: '11111111' });
    expect(result.status).toBe(500);
    expect(result.body).toBeDefined();
    expect(result.body.errors).toContain('internal_server_error');
    expect(result.body.status).toBe(false);
  });
});