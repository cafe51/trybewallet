// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { /* WALLET_ACTION, */ ADD_CURRENCIES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  // case WALLET_ACTION:
  //   return {
  //     ...state,
  //     wallet: action.payload,
  //   };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: [...state.expenses, ...action.payload],
    };
  default:
    return state;
  }
}
