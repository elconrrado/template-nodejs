const people = [
  {
    id: '11111111',
    name: 'Luigi',
    lastName: 'Conrado'
  },
  {
    id: '11111112',
    name: 'Mireya',
    lastName: 'Gonzalezs'
  },
  {
    id: '11111113',
    name: 'Marlon',
    lastName: 'Conrado'
  }
];

const exampleService = {
  
  /**
   * 
   * Obtiene una persona por el número de identificación
   * 
   * @param {object} payload Persona a encontrar
   * @return {Promise} devuelve persona encontrada  
   */

  getPersonById: async (payload) => {
    return people.find((person) => (person.id === payload.id));
  },
}

module.exports = { exampleService };