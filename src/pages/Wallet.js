import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';
import { fetchCurrencies, renderTotal } from '../actions';

// Crie um header para a página de carteira

class Wallet extends React.Component {
  render() {
    const { currencies, renderTotalField } = this.props;
    renderTotalField();
    currencies();
    return (
      <div>
        <Header />
        <Form />
        <Table />
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrencies()),
  renderTotalField: () => dispatch(renderTotal()),
});

Wallet.propTypes = {
  currencies: PropTypes.func.isRequired,
  renderTotalField: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
