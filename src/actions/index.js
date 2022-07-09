import getData from '../services/api';

// Coloque aqui suas actions
export const LOGGED = 'LOGGED';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const DEDUCT_VALUE = 'DEDUCT_VALUE';
export const RENDER_TOTAL = 'RENDER_TOTAL';

export function renderTotal() {
  return {
    type: RENDER_TOTAL,
  };
}

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

export function deleteExpense(expenseIndex) {
  return {
    type: DELETE_EXPENSES,
    payload: {
      expenseIndex,
    },
  };
}

export function deductValue(value) {
  return {
    type: DEDUCT_VALUE,
    payload: value,
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
    expenses.call = response;
    dispatch(addExpense(expenses, totalValue));
  };
}
