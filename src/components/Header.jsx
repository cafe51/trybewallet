import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user, totalExpended } = this.props;
    return (
      <header className="header">
        <h1 className="header__title">Carteira</h1>
        <h2 data-testid="email-field">{user}</h2>
        <div>
          <h3 data-testid="total-field">{ totalExpended.toFixed(2) }</h3>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  totalExpended: state.wallet.total,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  totalExpended: PropTypes.number,
};

Header.defaultProps = {
  totalExpended: 0,
};

export default connect(mapStateToProps)(Header);
