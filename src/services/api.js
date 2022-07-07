export async function getData() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function filteredCurrencies() {
  const currencies = await getData();
  const coinSymbols = Object.keys(currencies);
  const filteredCoinSymbols = coinSymbols.filter((currency) => currency !== 'USDT');
  return filteredCoinSymbols;
}
