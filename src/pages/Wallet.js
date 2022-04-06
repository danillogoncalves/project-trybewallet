import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrency, actionFetchExpenses } from '../actions/actionsAsysc';
import { deleteExpense, editExpense } from '../actions';
import Header from '../Component/Header';
import TableExpenses from '../Component/TableExpenses';

const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: METHODS[0],
      tag: TAGS[0],
      isDisabled: true,
      buttonEdit: '',
    };
  }

  async componentDidMount() {
    const { getCodeCurrencies } = this.props;
    await getCodeCurrencies();
    const { currencies } = this.props;
    this.setState({
      currency: currencies[0],
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateButton());
  };

  validateButton = () => {
    const { value, description } = this.state;
    this.setState({
      isDisabled: !(value && description),
    });
  }

  handleClick = async () => {
    const { getExpenseAndExchangeRate } = this.props;
    const { value, description, currency, method, tag } = this.state;
    await getExpenseAndExchangeRate({ value, description, currency, method, tag });
    const { currencies } = this.props;
    this.setState({
      value: '',
      description: '',
      currency: currencies[0],
      method: METHODS[0],
      tag: TAGS[0],
      isDisabled: true,
    });
  }

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
    return 0;
  }

  deleteExpenseClick = (id) => {
    const { expenses, getDeleteExpense } = this.props;
    getDeleteExpense(expenses, id);
  }

  editExpenseClick = (id) => {
    const { expenses } = this.props;
    expenses.forEach((expense, index) => {
      if (expense.id === +id) {
        this.setState({
          value: expense.value,
          description: expense.description,
          currency: expense.currency,
          method: expense.method,
          tag: expense.tag,
          buttonEdit: index,
        });
      }
    });
  }

  handleEditExpense = ({ target }) => {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, getEditExpense } = this.props;
    getEditExpense({ value, description, currency, method, tag }, target.value);
    this.setState({
      value: '',
      description: '',
      currency: currencies[0],
      method: METHODS[0],
      tag: TAGS[0],
      isDisabled: true,
      buttonEdit: '',
    });
  }

  render() {
    const { userEmail, expenses, currencies } = this.props;
    const { value, description, buttonEdit,
      currency, method, tag, isDisabled } = this.state;
    return (
      <div>
        <Header userEmail={ userEmail } totalExpenses={ this.totalExpenses } />
        <div>
          <label htmlFor="valueId">
            Valor:
            <input
              data-testid="value-input"
              id="valueId"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descriptionId">
            Descrição:
            <input
              data-testid="description-input"
              id="descriptionId"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencyId">
            Moeda:
            <select
              data-testid="currency-input"
              id="currencyId"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((eCurrency, index) => (
                <option key={ index } value={ eCurrency }>{eCurrency}</option>
              ))}
            </select>
          </label>
          <label htmlFor="methodId">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="methodId"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              { METHODS.map((eMethod, index) => (
                <option key={ index } value={ eMethod }>{eMethod}</option>
              ))}
            </select>
          </label>
          <label htmlFor="tagId">
            Categoria:
            <select
              data-testid="tag-input"
              id="tagId"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              { TAGS.map((eTag, index) => (
                <option key={ index } value={ eTag }>{eTag}</option>
              ))}
            </select>
          </label>
          {
            buttonEdit !== ''
              ? (
                <button
                  type="button"
                  value={ buttonEdit }
                  disabled={ isDisabled }
                  onClick={ this.handleEditExpense }
                >
                  Editar despesa
                </button>
              )
              : (
                <input
                  type="submit"
                  value="Adicionar despesa"
                  disabled={ isDisabled }
                  onClick={ this.handleClick }
                />
              )
          }
        </div>
        <TableExpenses
          expenses={ expenses }
          editExpenseClick={ this.editExpenseClick }
          deleteExpenseClick={ this.deleteExpenseClick }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCodeCurrencies: () => dispatch(actionFetchCurrency()),
  getExpenseAndExchangeRate: (expense) => dispatch(actionFetchExpenses(expense)),
  getDeleteExpense: (...payload) => dispatch(deleteExpense(...payload)),
  getEditExpense: (...payload) => dispatch(editExpense(...payload)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCodeCurrencies: PropTypes.func.isRequired,
  getExpenseAndExchangeRate: PropTypes.func.isRequired,
  getDeleteExpense: PropTypes.func.isRequired,
  getEditExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
