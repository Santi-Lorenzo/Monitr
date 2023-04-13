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
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    console.log("token", token);
    const expenses = await axios.get("/api/expenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.setState(expenses.data));
  } catch (err) {
    console.log("Error in initializeStateThunk:", err);
  }
};

actions.updateStateThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.put("/api/expenses", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.updateState(res.data));
  } catch (err) {
    console.log("Error in updateStateThunk:", err);
  }
};

actions.addStateThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.post("/api/expenses", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.addState(res.data));
  } catch (err) {
    console.log("Error in addStateThunk:", err);
  }
};

actions.deleteStateThunk = (state) => async (dispatch) => {
  try {
    const id = state._id;
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.delete(`/api/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.deleteState(res.data._id));
  } catch (err) {
    console.log("Error in deleteStateThunk:", err);
  }
};
export default actions;
