import React from "react";
import Nav from "./Nav";
import ExpensesTable from "./subcomponents/Expenses/ExpensesTable.jsx";

const Expenses = () => {
  return (
    <>
      <Nav />
      <ExpensesTable />
    </>
  );
};

export default Expenses;
