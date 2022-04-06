import { receiveCodeCoinFailure,
  receiveCodeCoinSuccess, receiveObjectFailure, receiveObjectSuccess } from '.';
import currencyQuoteBRLApi from '../services/currencyQuoteBRLApi';

export const actionFetchCurrency = () => async (dispatch) => {
  try {
    const response = await currencyQuoteBRLApi();
    return dispatch(receiveCodeCoinSuccess(response));
  } catch (error) {
    return dispatch(receiveCodeCoinFailure(error));
  }
};

export const actionFetchExpenses = (expense) => async (dispatch) => {
  try {
    const response = await currencyQuoteBRLApi();
    return dispatch(receiveObjectSuccess(expense, response));
  } catch (error) {
    return dispatch(receiveObjectFailure(error));
  }
};
