import React, { useEffect } from "react";
import Nav from "./Nav";
import IncomeTable from "./subcomponents/Income/IncomeTable.jsx";

const Income = () => {
  return (
    <>
      <Nav />
      <IncomeTable />
    </>
  );
};

export default Income;
