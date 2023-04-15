import React, { useState } from "react";
import Nav from "./Nav";

const Income = () => {
  return (
    <>
      <Nav />
      <div>Income</div>
      <input className="nameInput" type="date" />
    </>
  );
};

export default Income;
