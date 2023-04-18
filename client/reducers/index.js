import { combineReducers } from "redux";
import expensesReducer from "./expensesReducer";
import categoriesReducer from "./categoriesReducer";
import incomeReducer from "./incomeReducer";
import sourcesReducer from "./sourcesReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer,
  income: incomeReducer,
  sources: sourcesReducer,
  user: userReducer,
});

export default reducers;
