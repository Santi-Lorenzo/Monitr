import * as types from "../constants/actionTypes";

const initialState = {
  income: [],
};

const incomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_INCOME:
      return {
        ...state,
        income: action.payload,
      };

    case types.UPDATE_INCOME:
      const index = state.income.findIndex(
        (obj) => obj._id === action.payload._id
      );

      if (action.payload.date) {
        action.payload.date = action.payload.date.slice(0, 10);
      }

      const updatedIncome = [
        ...state.income.slice(0, index),
        action.payload,
        ...state.income.slice(index + 1),
      ];

      return {
        ...state,
        income: updatedIncome,
      };

    case types.ADD_INCOME:
      const newIncome = [...state.income, action.payload];
      return {
        ...state,
        income: newIncome,
      };

    case types.DELETE_INCOME:
      const deletedIncome = state.income.filter(
        (obj) => obj._id !== action.payload
      );
      return {
        ...state,
        income: deletedIncome,
      };

    default:
      return state;
  }
};

export default incomeReducer;
