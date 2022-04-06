import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, totalExpenses } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <span data-testid="email-field">{ userEmail }</span>
        <span data-testid="total-field">{totalExpenses()}</span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpenses: PropTypes.func.isRequired,
};

export default Header;
