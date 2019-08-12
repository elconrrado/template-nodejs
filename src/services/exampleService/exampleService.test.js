const { exampleService } = require('./exampleService')

describe('exampleService', () => {
  test('#getPersons', async () => {
    const people = await exampleService.getPersons();
    expect(people).toEqual([
      {
        name: 'Marlon',
        lastName: 'Conrado'
      }
    ]);
  });
});