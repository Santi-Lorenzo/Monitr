import { combineReducers } from "redux";
import expensesReducer from "./expensesReducer";
import categoriesReducer from "./categoriesReducer";
import incomeReducer from "./incomeReducer";
import sourcesReducer from "./sourcesReducer";

const reducers = combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer,
  income: incomeReducer,
  sources: sourcesReducer,
});

export default reducers;
