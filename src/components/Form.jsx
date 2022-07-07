import React from 'react';
import { filteredCurrencies } from '../services/api';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
  }

  async componentDidMount() {
    const response = await filteredCurrencies();
    this.setState({
      currencies: response,
    });
  }

  render() {
    const { currencies } = this.state;
    const paymentOptions = [
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ];
    const categories = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];

    return (
      <div>
        <div>
          <label htmlFor="form-value-input">
            Valor
            <input
              // value=""
              type="text"
              name="value"
              id="form-value-input"
              data-testid="value-input"
            />
          </label>
        </div>
        <div>
          <label htmlFor="form-description-input">
            Descrição
            <input
              // value=""
              type="text"
              name="description"
              id="form-description-input"
              data-testid="description-input"
            />
          </label>
        </div>
        <div>
          <label htmlFor="form-currency-input">
            Moeda
            <select
              name="currency"
              id="form-currency-input"
              // data-testid="description-input"
            >
              {
                currencies.map((currency) => (
                  <option
                    key={ currency }
                    value={ currency }
                  >
                    {currency}
                  </option>))
              }
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="form-payment-input">
            Método de pagamento
            <select
              name="payment"
              id="form-payment-input"
              data-testid="method-input"
            >
              {
                paymentOptions.map((payment) => (
                  <option
                    key={ payment }
                    value={ payment }
                  >
                    {payment}
                  </option>))
              }
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="form-category-input">
            Categoria
            <select
              name="category"
              id="form-category-input"
              data-testid="tag-input"
            >
              {
                categories.map((category) => (
                  <option
                    key={ category }
                    value={ category }
                  >
                    {category}
                  </option>))
              }
            </select>
          </label>
        </div>
      </div>
    );
  }
}

export default Form;
