import React, { useEffect } from "react";
import Nav from "./Nav";
import DashboardTable from "./subcomponents/Dashboard/DashboardTable";
import actions from "../actions/actions";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initializeExpensesThunk());
    dispatch(actions.initializeCategoriesThunk());
    dispatch(actions.initializeIncomeThunk());
    dispatch(actions.initializeSourcesThunk());
  }, []);

  return (
    <>
      <Nav />
      <DashboardTable />
    </>
  );
};

export default Dashboard;
