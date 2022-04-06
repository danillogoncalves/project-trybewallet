import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length) {
      return expenses.reduce((acc, curr) => {
        const { value, currency, exchangeRates } = curr;
        const sum = +value * +exchangeRates[currency].ask;
        acc += sum;
        return acc;
      }, 0).toFixed(2);
    }
    return '0.00';
  }

  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <span data-testid="email-field">{ userEmail }</span>
        <span data-testid="total-field">{ this.totalExpenses() }</span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
