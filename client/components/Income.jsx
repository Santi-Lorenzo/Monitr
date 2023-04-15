import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Nav from "./Nav";
import IncomeTable from "./subcomponents/Income/IncomeTable.jsx";
import actions from "../actions/actions";

const Income = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initializeIncomeThunk());
    dispatch(actions.initializeSourcesThunk());
  }, []);

  return (
    <>
      <Nav />
      <IncomeTable />
    </>
  );
};

export default Income;
