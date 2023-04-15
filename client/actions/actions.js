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
        actions.addExpenseThunk({
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

actions.setSelectedCategory = (state) => ({
  type: types.SET_SELECTED_CATEGORY,
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

    dispatch(actions.setCategories(res.data));
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

actions.deleteCategoryThunk = (state) => async (dispatch) => {
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

//---------------------------------income--------------------------------
actions.setIncome = (state) => ({
  type: types.SET_INCOME,
  payload: state,
});

actions.updateIncome = (state) => ({
  type: types.UPDATE_INCOME,
  payload: state,
});

actions.addIncome = (state) => ({
  type: types.ADD_INCOME,
  payload: state,
});

actions.deleteIncome = (state) => ({
  type: types.DELETE_INCOME,
  payload: state,
});

actions.initializeIncomeThunk = () => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.get("/api/income", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.length === 0) {
      dispatch(
        actions.addIncomeThunk({
          amount: "",
          date: "",
          category: "",
        })
      );
    } else {
      dispatch(actions.setIncome(res.data));
    }
  } catch (err) {
    console.log("Error in initializeIncomeThunk:", err);
  }
};

actions.addIncomeThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.post("/api/income", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.addIncome(res.data));
  } catch (err) {
    console.log("Error in addIncomeThunk:", err);
  }
};

actions.updateIncomeThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.put("/api/income", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res.data);
    dispatch(actions.updateIncome(res.data));
  } catch (err) {
    console.log("Error in updateIncomeThunk:", err);
  }
};

actions.deleteIncomeThunk = (state) => async (dispatch) => {
  try {
    const id = state._id;
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.delete(`/api/income/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.deleteIncome(res.data._id));
  } catch (err) {
    console.log("Error in deleteIncomeThunk:", err);
  }
};

//----------------------sources-----------------------------
actions.setSources = (state) => ({
  type: types.SET_SOURCES,
  payload: state,
});

actions.updateSource = (state) => ({
  type: types.UPDATE_SOURCE,
  payload: state,
});

actions.addSource = (state) => ({
  type: types.ADD_SOURCE,
  payload: state,
});

actions.deleteSource = (state) => ({
  type: types.DELETE_SOURCE,
  payload: state,
});

actions.setSelectedSource = (state) => ({
  type: types.SET_SELECTED_SOURCE,
  payload: state,
});

actions.initializeSourcesThunk = () => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.get("/api/sources", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(actions.setSources(res.data));
  } catch (err) {
    console.log("Error in initializeSourcesThunk:", err);
  }
};

actions.addSourceThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.post("/api/sources", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.addSource(res.data));
  } catch (err) {
    console.log("Error in addSourceThunk:", err);
  }
};

actions.updateSourceThunk = (state) => async (dispatch) => {
  try {
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.put("/api/sources", state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res.data);
    dispatch(actions.updateSource(res.data));
  } catch (err) {
    console.log("Error in updateSourceThunk:", err);
  }
};

actions.deleteSourceThunk = (state) => async (dispatch) => {
  try {
    const id = state._id;
    const token = JSON.parse(window.localStorage.getItem("loggedBBUser"));
    const res = await axios.delete(`/api/sources/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(actions.deleteSource(res.data._id));
  } catch (err) {
    console.log("Error in deleteSourceThunk:", err);
  }
};

export default actions;
