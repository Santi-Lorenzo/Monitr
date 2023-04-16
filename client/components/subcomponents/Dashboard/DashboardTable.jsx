import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../actions/actions";

const DashboardTable = () => {
  // determine the amount of categories being used
  // add a boolean to categories model determining wether category is in use
  // name, date, amount, category
  // we need list of expenses that line up with each month, and add amount to appropriate category column

  //iterate through each expense in expenses placing each expense object in correct month container
  //iterate through each month container placing adding expense amount to correct category
  // basically we need to map each expense object to a month and category cell

  //loop through each month
  //loop through each category

  const expenses = useSelector((state) => state.expenses.expenses);
  const categories = useSelector((state) => state.categories.categories);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const filteredCategories = categories.filter((category) => category.selected);

  const rows = months.map((month, index) => {
    return (
      <tr>
        <td>{month}</td>
        {filteredCategories.map((category, idx) => {
          return (
            <td>
              {expenses
                .filter((expense) => {
                  const date = new Date(expense.date);
                  return (
                    expense.category === category.name &&
                    index === date.getMonth()
                  );
                })
                .reduce((acc, expense) => {
                  return acc + expense.amount;
                }, 0)}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Category 1</th>
          <th>Category 2</th>
          <th>Category 3</th>
          <th>Category 4</th>
          <th>Category 5</th>
          {/* <th>Total Expenditure</th>
        <th>Total Income</th>
        <th>Gross Savings</th> */}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default DashboardTable;
