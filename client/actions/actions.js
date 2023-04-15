import * as types from "../constants/actionTypes";
import axios from "axios";

const actions = {};

actions.setExpenses = (state) => ({
  type: types.SET_EXPENSES,
  payload: state,
});

actions.updateExpense = (state) => ({
  type: types.UPDATE_EXPENSE,
  payload: state,
});

actions.addExpense = (state) => ({
  type: types.ADD_EXPENSE,
  payload: state,
});

actions.deleteExpense = (state) => ({
  type: types.DELETE_EXPENSE,
  payload: state,
});

actions.initializeExpensesThunk = () => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.get("/api/expenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.length === 0) {
      dispatch(
        actions.addStateThunk({
          name: "",
          amount: "",
          date: "",
          category: "",
        })
      );
    } else {
      dispatch(actions.setExpenses(res.data));
    }
  } catch (err) {
    console.log("Error in initializeExpensesThunk:", err);
  }
};

actions.addExpenseThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.post("/api/expenses", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.addExpense(res.data));
  } catch (err) {
    console.log("Error in addExpenseThunk:", err);
  }
};

actions.updateExpenseThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.put("/api/expenses", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res.data);
    dispatch(actions.updateExpense(res.data));
  } catch (err) {
    console.log("Error in updateExpenseThunk:", err);
  }
};

actions.deleteExpenseThunk = (state) => async (dispatch) => {
  try {
    const id = state._id;
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.delete(`/api/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.deleteExpense(res.data._id));
  } catch (err) {
    console.log("Error in deleteExpenseThunk:", err);
  }
};

//----------------------categories-----------------------------
actions.setCategories = (state) => ({
  type: types.SET_CATEGORIES,
  payload: state,
});

actions.updateCategory = (state) => ({
  type: types.UPDATE_CATEGORY,
  payload: state,
});

actions.addCategory = (state) => ({
  type: types.ADD_CATEGORY,
  payload: state,
});

actions.deleteCategory = (state) => ({
  type: types.DELETE_CATEGORY,
  payload: state,
});

actions.initializeCategoriesThunk = () => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.get("/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
    if (res.data.length === 0) {
      dispatch(
        actions.addCategoryThunk({
          name: "",
        })
      );
    } else {
      dispatch(actions.setCategories(res.data));
    }
  } catch (err) {
    console.log("Error in initializeCategoriesThunk:", err);
  }
};

actions.addCategoryThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.post("/api/categories", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.addCategory(res.data));
  } catch (err) {
    console.log("Error in addCategoryThunk:", err);
  }
};

actions.updateCategoryThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.put("/api/categories", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res.data);
    dispatch(actions.updateCategory(res.data));
  } catch (err) {
    console.log("Error in updateCategoryThunk:", err);
  }
};

actions.deleteExpenseThunk = (state) => async (dispatch) => {
  try {
    const id = state._id;
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.delete(`/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.deleteCategory(res.data._id));
  } catch (err) {
    console.log("Error in deleteExpenseThunk:", err);
  }
};

export default actions;
