import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../actions/actions";

const DashboardTable = () => {
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
  let sumExpenditures = 0;

  const categoriesTH = filteredCategories.map((category) => {
    const header =
      category.name[0].toUpperCase() + category.name.substring(1).toLowerCase();
    return <th>{header}</th>;
  });

  const rows = months.map((month, index) => {
    let total = 0;
    return (
      <tr>
        <td>{month}</td>
        {filteredCategories.map((category) => {
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
                  total += expense.amount;
                  sumExpenditures += expense.amount;
                  return acc + expense.amount;
                }, 0)}
            </td>
          );
        })}
        <td>{total}</td>
      </tr>
    );
  });

  const totals = (
    <tr>
      <td>Total</td>
      {filteredCategories.map((category) => {
        return (
          <td>
            {expenses.reduce((acc, expense) => {
              if (expense.category === category.name) {
                return acc + expense.amount;
              }
              return acc + 0;
            }, 0)}
          </td>
        );
      })}
      <td>{sumExpenditures}</td>
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          {categoriesTH}
          <th>Total Expenditure</th>
          <th>Total Income</th>
          <th>Gross Savings</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      <tfoot>{totals}</tfoot>
    </table>
  );
};

export default DashboardTable;
