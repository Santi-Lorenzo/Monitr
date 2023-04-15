import * as types from "../constants/actionTypes";

const initialState = {
  expenses: [],
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };

    case types.UPDATE_EXPENSE:
      const index = state.expenses.findIndex(
        (obj) => obj._id === action.payload._id
      );

      action.payload.date = action.payload.date.slice(0, 10);

      const updatedExpenses = [
        ...state.expenses.slice(0, index),
        action.payload,
        ...state.expenses.slice(index + 1),
      ];

      return {
        ...state,
        expenses: updatedExpenses,
      };

    case types.ADD_EXPENSE:
      const newExpenses = [...state.expenses, action.payload];
      return {
        ...state,
        expenses: newExpenses,
      };

    case types.DELETE_EXPENSE:
      const deletedExpenses = state.expenses.filter(
        (obj) => obj._id !== action.payload
      );
      return {
        ...state,
        expenses: deletedExpenses,
      };

    default:
      return state;
  }
};

export default expensesReducer;
