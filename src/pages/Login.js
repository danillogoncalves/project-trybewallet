import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { receiveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      this.setState({
        isDisabled: !(this.validateEmail(email)
        && this.validatePassword(password)),
      });
    });
  };

  validateEmail = (value) => {
    // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const validator = /\S+@\S+\.\S+/;
    const isvalid = validator.test(value);
    return isvalid;
  };

  validatePassword = (value) => {
    const FIVE = 5;
    return value.length > FIVE;
  }

  handleClick = (event) => {
    event.preventDefault();
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <h1>LOGIN</h1>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
          />
          <input
            type="submit"
            value="Entrar"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(receiveEmail(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
