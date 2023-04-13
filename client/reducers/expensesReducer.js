import * as types from "../constants/actionTypes";

const initialState = {
  date: null,
  item: null,
  amount: null,
  categories: [],
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_INITIAL_STATE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default expensesReducer;
