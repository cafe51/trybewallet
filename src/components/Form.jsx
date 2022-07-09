import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpensesThunk } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: {},
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleClick = () => {
    const { newExpense, cotacao, taxaDeCambio } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const expenseObject = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: taxaDeCambio,
    };
    console.log(cotacao);
    // const totalValue = cotacao[currency].ask * value;
    newExpense(expenseObject);
    this.setState({ id: id + 1, value: '' });
    // console.log(expenseObject);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    const methodOptions = [
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
            Valor da despesa
            <input
              onChange={ this.handleChange }
              value={ value }
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
              onChange={ this.handleChange }
              value={ description }
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
              onChange={ this.handleChange }
              value={ currency }
              name="currency"
              id="form-currency-input"
              // data-testid="description-input"
            >
              {
                currencies.map((coin, index) => (
                  <option
                    key={ index }
                    value={ coin }
                  >
                    {coin}
                  </option>))
              }
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="form-method-input">
            Método de pagamento
            <select
              onChange={ this.handleChange }
              value={ method }
              name="method"
              id="form-method-input"
              data-testid="method-input"
            >
              {
                methodOptions.map((payment) => (
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
          <label htmlFor="form-tag-input">
            Categoria
            <select
              onChange={ this.handleChange }
              value={ tag }
              name="tag"
              id="form-tag-input"
              data-testid="tag-input"
            >
              {
                categories.map((categorie) => (
                  <option
                    key={ categorie }
                    value={ categorie }
                  >
                    {categorie}
                  </option>))
              }
            </select>
          </label>
        </div>
        <div>
          <button
            onClick={ this.handleClick }
            type="button"
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newExpense: (expense) => dispatch(updateExpensesThunk(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  cotacao: state.wallet.allData,
  taxaDeCambio: state.wallet.allData,
});

Form.propTypes = {
  taxaDeCambio: PropTypes.objectOf(PropTypes.number).isRequired,
  newExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  cotacao: PropTypes.objectOf(PropTypes.object),
};

Form.defaultProps = {
  cotacao: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
