import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableExpenses extends Component {
  render() {
    const { expenses, editExpenseClick, deleteExpenseClick } = this.props;
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
                    onClick={ () => editExpenseClick(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    value={ expense.id }
                    onClick={ () => deleteExpenseClick(expense.id) }
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

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteExpenseClick: PropTypes.func.isRequired,
  editExpenseClick: PropTypes.func.isRequired,
};

export default TableExpenses;
