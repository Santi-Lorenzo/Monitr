import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Nav from "./Nav";
import ExpensesTable from "./subcomponents/Expenses/ExpensesTable.jsx";
import actions from "../actions/actions";

const Expenses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initializeStateThunk());
  }, []);

  return (
    <>
      <Nav />
      <ExpensesTable />
    </>
  );
};

export default Expenses;
