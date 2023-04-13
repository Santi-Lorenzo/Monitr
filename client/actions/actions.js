import * as types from "../constants/actionTypes";
import axios from "axios";

const actions = {};

actions.setState = (state) => ({
  type: types.SET_STATE,
  payload: state,
});

actions.updateState = (state) => ({
  type: types.UPDATE_STATE,
  payload: state,
});

actions.addState = (state) => ({
  type: types.ADD_STATE,
  payload: state,
});

actions.deleteState = (state) => ({
  type: types.DELETE_STATE,
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

actions.updateStateThunk = (state) => async (dispatch) => {
  try {
    const res = await axios.put("/api/expenses", state);
    dispatch(actions.updateState(res.data));
  } catch (err) {
    console.log("Error in updateStateThunk:", err);
  }
};

actions.addStateThunk = (state) => async (dispatch) => {
  try {
    const res = await axios.post("/api/expenses", state);
    dispatch(actions.addState(res.data));
  } catch (err) {
    console.log("Error in addStateThunk:", err);
  }
};

actions.deleteStateThunk = (state) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/expenses", {
      data: {
        state,
      },
    });
    dispatch(actions.deleteState(res.data._id));
  } catch (err) {
    console.log("Error in deleteStateThunk:", err);
  }
};
export default actions;
