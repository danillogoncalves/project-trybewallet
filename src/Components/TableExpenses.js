import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, receiveIndexOfEdit } from '../actions';

class TableExpenses extends Component {
  deleteExpenseClick = ({ target }) => {
    const { expenses, getDeleteExpense } = this.props;
    getDeleteExpense(expenses, target.value);
  }

  editExpenseClick = ({ target }) => {
    const { expenses, getReceiveIndexOfEdit } = this.props;
    expenses.forEach((expense, index) => {
      if (expense.id === +target.value) {
        getReceiveIndexOfEdit(index);
      }
    });
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ (+expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>{ (+expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
                <td>
                  { ((+expense.value)
                   * (+expense.exchangeRates[expense.currency].ask)).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    value={ expense.id }
                    onClick={ this.editExpenseClick }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    value={ expense.id }
                    onClick={ this.deleteExpenseClick }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getDeleteExpense: (...payload) => dispatch(deleteExpense(...payload)),
  getReceiveIndexOfEdit: (index) => dispatch(receiveIndexOfEdit(index)),
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  getDeleteExpense: PropTypes.func.isRequired,
  getReceiveIndexOfEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
