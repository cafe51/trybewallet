import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';
// import { filteredCurrencies } from '../services/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // disabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  checkDisabled = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const regex = /\S+@\S+\.com/;
    const arrayConditions = [
      password.length >= minLength,
      regex.test(email),
    ];
    return !arrayConditions.every((condition) => condition);
  }

  handleClick = () => {
    const { email } = this.state;
    const { loginDispatch, history } = this.props;
    loginDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              onChange={ this.handleChange }
              value={ email }
              type="text"
              name="email"
              id="email-input"
              data-testid="email-input"
            />
          </label>
          <br />
          <label htmlFor="password-input">
            Password:
            <input
              onChange={ this.handleChange }
              value={ password }
              type="password"
              name="password"
              id="password-input"
              data-testid="password-input"
            />
          </label>
          <br />
          <button
            disabled={ this.checkDisabled() }
            type="button"
            value="Login"
            onClick={ () => this.handleClick() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (userData) => dispatch(login(userData)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
