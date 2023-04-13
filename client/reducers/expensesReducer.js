import * as types from "../constants/actionTypes";

const initialState = {
  expenses: [],
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_STATE:
      return {
        ...state,
        expenses: action.payload,
      };

    default:
      return state;
  }
};

export default expensesReducer;
