import * as types from "../constants/actionTypes";

const initialState = {
  user: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
