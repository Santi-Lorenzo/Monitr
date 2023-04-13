import * as types from "../constants/actionTypes";
import axios from "axios";

const actions = {};

actions.setState = (state) => ({
  type: types.SET_STATE,
  payload: state,
});

actions.initializeStateThunk = () => async (dispatch) => {
  try {
    const expenses = await axios.get("/api/expenses");
    dispatch(actions.setState(expenses.data));
  } catch (err) {
    console.log("Error in initializeStateThunk:", err);
  }
};

export default actions;
