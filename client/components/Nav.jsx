import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import actions from "../actions/actions";

const Nav = () => {
  const dispatch = useDispatch();
  const logout = () => {
    window.localStorage.removeItem("loggedBBUser");
    dispatch(actions.setUser(false));
  };

  return (
    <nav className="nav">
      <Link className="link" to="/">
        Dashboard
      </Link>
      <Link className="link" to="/expenses">
        Expenses
      </Link>
      <Link className="link" to="/income">
        Income
      </Link>
      <Link onClick={logout} className="link" to="/login">
        Logout
      </Link>
    </nav>
  );
};

export default Nav;
