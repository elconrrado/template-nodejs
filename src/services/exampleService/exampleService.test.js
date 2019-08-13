const { exampleService } = require('./exampleService')

describe('exampleService', () => {
  test('#getPersonById devuelve persona', async () => {
    const payload = {
      id: '11111111'
    }
    const person = await exampleService.getPersonById(payload);
    expect(person).toEqual({
      id: '11111111',
      name: 'Luigi',
      lastName: 'Conrado'
    });
  });
});