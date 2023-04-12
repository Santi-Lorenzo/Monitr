import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <Link className="link" to="/dashboard">
        Dashboard
      </Link>
      <Link className="link" to="/expenses">
        Expenses
      </Link>
      <Link className="link" to="/income">
        Income
      </Link>
    </nav>
  );
};

export default Nav;
