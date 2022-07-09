import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, deductValue, renderTotal } from '../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: 0,
    };
  }

  deleteExpenseClick = ({ target }) => {
    const { deleteLine, deduct, renderTotalField } = this.props;
    const { click } = this.state;
    deleteLine(Number(target.name));
    // deduct(Number(target.parentNode.parentNode.children[6].innerHTML));
    this.setState({ click: click + 1 });
    console.log(deduct);
    renderTotalField();
    // history.push('/carteira');
    // console.log(Number(target.parentNode.parentNode.children[6].innerHTML));
    // console.log(expenses.splice(Number(0)), 1);
  }

  render() {
    const { expenses } = this.props;
    // const { data } = this.state;
    // console.log(data);
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>

            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>

            <th>Moeda de conversão</th>

            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense, index) => {
            // const { USD } = data;
            // const { ask, name } = data[expense.currency];
            const { ask, name } = expense.exchangeRates[expense.currency];
            // console.log(Number(expense.value).toFixed(2));
            const cambio = Number(ask).toFixed(2);
            const gastoConvertido = (Number(expense.value) * Number(ask)).toFixed(2);
            // console.log(Number(ask).toFixed(2));
            // const fruta = 'batata';
            return (
              <tr key={ expense.id }>

                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{name}</td>

                <td>{cambio}</td>
                <td>{gastoConvertido}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="button button--edit"
                  >
                    Editar
                  </button>
                  <button
                    name={ index }
                    type="button"
                    className="button button--delete"
                    data-testid="delete-btn"
                    onClick={ this.deleteExpenseClick }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteLine: (indexExpense) => dispatch(deleteExpense(indexExpense)),
  deduct: (value) => dispatch(deductValue(value)),
  renderTotalField: () => dispatch(renderTotal()),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  allData: state.wallet.allData,
});

Table.propTypes = {
  renderTotalField: PropTypes.func.isRequired,
  deduct: PropTypes.func.isRequired,
  deleteLine: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,

  })),
  allData: PropTypes.shape({
    BTC: PropTypes.shape({
      ask: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    USD: PropTypes.shape({
      ask: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

Table.defaultProps = {
  expenses: [],
  allData: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
