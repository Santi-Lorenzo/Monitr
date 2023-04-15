import { combineReducers } from "redux";
import expensesReducer from "./expensesReducer";
import categoriesReducer from "./categoriesReducer";

const reducers = combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer,
});

export default reducers;
