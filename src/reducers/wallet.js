// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { UPDATE_EXPENSES, ADD_CURRENCIES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0,
  allData: {},
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, ...action.payload.expenses],
      total: state.total + action.payload.total,
    };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: [...state.currencies, ...action.payload.currencies],
      allData: action.payload.allData,
    };
  default:
    return state;
  }
}
