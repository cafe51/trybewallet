import getData from '../services/api';

// Coloque aqui suas actions
export const LOGGED = 'LOGGED';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export function login(userData) {
  return {
    type: LOGGED,
    payload: userData,
  };
}

function addExpense(expense, totalValue) {
  return {
    type: UPDATE_EXPENSES,
    payload: {
      expenses: [expense],
      total: totalValue,
    },
  };
}

function addCurrencies(currencies, allData) {
  return {
    type: ADD_CURRENCIES,
    payload: {
      currencies,
      allData,
    },
  };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    const currencies = await getData();
    const coinSymbols = Object.keys(currencies);
    const filteredCoinSymbols = coinSymbols.filter((currency) => currency !== 'USDT');
    dispatch(addCurrencies(filteredCoinSymbols, currencies));
  };
}

export function updateExpensesThunk(expenses, totalValue) {
  return async (dispatch) => {
    const response = await getData();
    expenses.exchangeRates = response;
    dispatch(addExpense(expenses, totalValue));
  };
}
