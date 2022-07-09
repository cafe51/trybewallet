// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { UPDATE_EXPENSES,
  ADD_CURRENCIES,
  DELETE_EXPENSES,
  DEDUCT_VALUE,
  RENDER_TOTAL,
} from '../actions/index';

import { response } from '../tests/mocks/mockData';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [
    {
      id: 0,
      value: '10',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Lazer',
      description: 'Dez dólares',
      exchangeRates: response,
    },
    {
      id: 1,
      value: '20',
      currency: 'EUR',
      method: 'Dinheiro',
      tag: 'Trabalho',
      description: 'Vinte euros',
      exchangeRates: response,
    },
  ], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  // total: (this.expenses !== undefined)
  //   ? (
  //     expenses
  //       .map(({ value, exchangeRates, currency }) => value * exchangeRates[currency])
  //       .reducer((acc, curr) => acc + curr, 0)
  //   )
  //   : 0, // valor numérico que armazena o valor total das despesas
  allData: {},
  total: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, ...action.payload.expenses],
      total: state.total + action.payload.total,
    };
  case DELETE_EXPENSES:
    state.expenses.splice(action.payload.expenseIndex, 1);
    return {
      ...state,
      expenses: state.expenses,
    };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: [...state.currencies, ...action.payload.currencies],
      allData: action.payload.allData,
    };
  case DEDUCT_VALUE:
    return {
      ...state,
      total: state.total - action.payload,
    };
  case RENDER_TOTAL:
    return {
      ...state,
      total: 0,
      // (state.expenses !== undefined && state.expenses.length > 0)
      //   ? (
      //     state.expenses
      //       .map(({ value, exchangeRates, currency }) => value * exchangeRates[currency])
      //       .reducer((acc, curr) => acc + curr, 0)
      //   )
      //   : 1,
    };

  default:
    return state;
  }
}
