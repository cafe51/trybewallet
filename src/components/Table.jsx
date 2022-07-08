import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  // constructor(props) {
  // super(props);
  // const { allData } = this.props;
  // this.state = { data: allData };
  // }

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
          { expenses.map((expense) => {
            // const { USD } = data;
            // const { ask, name } = data[expense.currency];
            const { ask, name } = expense.exchangeRates[expense.currency];
            console.log(Number(expense.value).toFixed(2));
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
                  <button type="button" className="button button--edit">
                    Editar
                  </button>
                  <button type="button" className="button button--delete">
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

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  allData: state.wallet.allData,
});

Table.propTypes = {
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

export default connect(mapStateToProps)(Table);
