// Coloque aqui suas actions
export const RECEIVE_EMAIL = 'RECEIVE_EMAIL';
export const RECEIVE_CODE_CURRERY_SUCCESS = 'RECEIVE_CODE_CURRERY_SUCCESS';
export const RECEIVE_CODE_CURRERY_FAILURE = 'RECEIVE_CODE_CURRERY_FAILURE';
export const RECEIVE_OBJECT_SUCCESS = 'RECEIVE_OBJECT_SUCCESS';
export const RECEIVE_OBJECT_FAILURE = 'RECEIVE_OBJECT_FAILURE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const receiveEmail = (value) => ({
  type: RECEIVE_EMAIL, email: value,
});

export const receiveCodeCoinSuccess = (currency) => ({
  type: RECEIVE_CODE_CURRERY_SUCCESS, currencies: currency,
});

export const receiveCodeCoinFailure = (error) => ({
  type: RECEIVE_CODE_CURRERY_FAILURE, error,
});

export const receiveObjectSuccess = (expense, exchangeRate) => ({
  type: RECEIVE_OBJECT_SUCCESS, expense, exchangeRate,
});

export const receiveObjectFailure = (error) => ({
  type: RECEIVE_OBJECT_FAILURE, error,
});

export const deleteExpense = (expenses, deleteExpenseId) => ({
  type: DELETE_EXPENSE, expenses, deleteExpenseId,
});

export const editExpense = (expense, editExpenseIndex) => ({
  type: EDIT_EXPENSE, expense, editExpenseIndex,
});
