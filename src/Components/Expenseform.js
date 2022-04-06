import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrency, actionFetchExpenses } from '../actions/actionsAsysc';
import { editExpense, receiveIndexOfEdit } from '../actions';

const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class Expenseform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: METHODS[0],
      tag: TAGS[0],
      isDisabled: true,
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

  handleEditExpense = async ({ target }) => {
    const { getEditExpense, getReceiveIndexOfEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    await getEditExpense({ value, description, currency, method, tag }, target.value);
    const { currencies } = this.props;
    const INDEX = -1;
    this.setState({
      value: '',
      description: '',
      currency: currencies[0],
      method: METHODS[0],
      tag: TAGS[0],
      isDisabled: true,
    }, () => getReceiveIndexOfEdit(INDEX));
  }

  render() {
    const {
      currencies,
      buttonEdit,
    } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      isDisabled,
    } = this.state;
    return (
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
          buttonEdit >= 0
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
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  buttonEdit: state.wallet.buttonEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getCodeCurrencies: () => dispatch(actionFetchCurrency()),
  getExpenseAndExchangeRate: (expense) => dispatch(actionFetchExpenses(expense)),
  getEditExpense: (...payload) => dispatch(editExpense(...payload)),
  getReceiveIndexOfEdit: (index) => dispatch(receiveIndexOfEdit(index)),
});

Expenseform.propTypes = {
  getCodeCurrencies: PropTypes.func.isRequired,
  getExpenseAndExchangeRate: PropTypes.func.isRequired,
  getEditExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonEdit: PropTypes.number.isRequired,
  getReceiveIndexOfEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenseform);
