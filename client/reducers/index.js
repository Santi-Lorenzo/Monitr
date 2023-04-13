import { combineReducers } from "redux";
import expensesReducer from "./expensesReducer";

const reducers = combineReducers({
  expenses: expensesReducer,
});

export default reducers;
