import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     despesas: [],
  //   };
  // }

  // componenteDidMout() {
  //   const { expenses } = this.props;
  //   this.setState({
  //     despesas: expenses,
  //   });
  // }

  render() {
    const { user } = this.props;
    const { expenses, totalExpended } = this.props;
    // console.log(expenses
    //   .map(({ value, exchangeRates, currency }) => exchangeRates[currency].ask * value)
    //   .reduce((acc, curr) => acc + curr));
    const newTotalExpended = (expenses !== undefined && expenses.length > 0)
      ? (
        expenses
          .map(
            ({ value, exchangeRates, currency }) => exchangeRates[currency].ask * value,
          )
          .reduce((acc, curr) => acc + curr)
      )
      : 0;
    // console.log(newTotalExpended);
    return (
      <header className="header">
        <h1 className="header__title">Carteira</h1>
        <h2 data-testid="email-field">{user}</h2>
        <div>
          <p>{ Number(totalExpended).toFixed(2) }</p>
          <h3 data-testid="total-field">{ Number(newTotalExpended).toFixed(2) }</h3>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  totalExpended: state.wallet.total,
  expenses: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({
//   totalExpended: () => dispatch(totalExpended()),
// });

Header.propTypes = {
  user: PropTypes.string.isRequired,
  totalExpended: PropTypes.number,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      BRL: PropTypes.shape({
        ask: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
};

Header.defaultProps = {
  totalExpended: 0,
};

export default connect(mapStateToProps)(Header);
