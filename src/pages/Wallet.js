import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import { fetchCurrencies } from '../actions';

// Crie um header para a página de carteira

class Wallet extends React.Component {
  render() {
    const { currencies } = this.props;
    currencies();
    return (
      <div>
        <Header />
        <Form />
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  currencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
