import React from 'react';
import Header from '../Components/Header';
import TableExpenses from '../Components/TableExpenses';
import Expenseform from '../Components/Expenseform';

function Wallet() {
  return (
    <div>
      <Header />
      <Expenseform />
      <TableExpenses />
    </div>
  );
}

export default Wallet;
