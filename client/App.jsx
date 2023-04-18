import React, { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Expenses from "./components/Expenses";
import Income from "./components/Income";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "./actions/actions";

const App = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBBUser");
    if (loggedUserJSON) {
      dispatch(actions.setUserThunk());
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/expenses"
          element={user ? <Expenses /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/income"
          element={user ? <Income /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
