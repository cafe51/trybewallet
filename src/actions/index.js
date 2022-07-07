import { filteredCurrencies } from '../services/api';

// Coloque aqui suas actions
export const LOGGED = 'LOGGED';
export const WALLET_ACTION = 'WALLET_ACTION';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export function login(userData) {
  return {
    type: LOGGED,
    payload: userData,
  };
}

export function walletActionCreator(walletData) {
  return {
    type: WALLET_ACTION,
    payload: walletData,
  };
}

function addCurrencies(currencies) {
  return {
    type: ADD_CURRENCIES,
    payload: currencies,
  };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    const currencies = await filteredCurrencies();
    dispatch(addCurrencies(currencies));
  };
}
// export function fetchCurrencies() {
//   return async (dispatch) => {
//     const currencies = await getData();
//     const coinSymbols = Object.keys(currencies);
//     const filteredCoinSymbols = coinSymbols.filter((currency) => currency !== 'USDT');
//     dispatch(addCurrencies(filteredCoinSymbols));
//   };
// }
