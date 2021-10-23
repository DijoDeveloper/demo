import Immutable from 'seamless-immutable';
/**
 * set initial state as immutable
 */
const initialState = Immutable({
  userActions: {
    products: [
      {
        name: 'Guac de la Costa',
        description: 'tortelias de mail, fruit de passion, mango',
        price: '7',
        id: 1,
        quantity: 0,
      },
      {
        name: 'Chicaron C cherceva',
        description: 'citron vet corona sauce',
        price: '5',
        id: 2,
        quantity: 0,
      },
      {
        name: 'Chiltos con',
        description: 'fruit de passion, mango corona sauce',
        price: '8',
        id: 3,
        quantity: 0,
      },
      {
        name: 'Anabell D Volun',
        description: 'tortelias de mail, fruit de passion, mango',
        price: '7',
        id: 4,
        quantity: 0,
      },
    ],
  },
});

export default initialState;
