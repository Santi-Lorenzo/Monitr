import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const DashboardTable = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const categories = useSelector((state) => state.categories.categories);
  const income = useSelector((state) => state.income.income);
  const sources = useSelector((state) => state.sources.sources);

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

  let sumExpenditures = 0;
  let sumIncome = 0;
  const filteredCategories = categories.filter((category) => category.selected);
  const categoriesTH = filteredCategories.map((category) => {
    const header =
      category.name[0].toUpperCase() + category.name.substring(1).toLowerCase();
    return <th>{header}</th>;
  });

  const filteredSources = sources.filter((source) => source.selected);
  const sourcesTH = filteredSources.map((source) => {
    const header =
      source.name[0].toUpperCase() + source.name.substring(1).toLowerCase();
    return <th>{header}</th>;
  });

  const rows = months.map((month, index) => {
    let totalExpenditure = 0;
    let totalIncome = 0;
    return (
      <tr>
        <td>{month}</td>
        {filteredCategories.map((category) => {
          return (
            <td className="amountInput">
              $
              {expenses
                .filter((expense) => {
                  const date = new Date(expense.date);
                  return (
                    expense.category === category.name &&
                    index === date.getMonth()
                  );
                })
                .reduce((acc, expense) => {
                  totalExpenditure += expense.amount;
                  sumExpenditures += expense.amount;
                  return acc + expense.amount;
                }, 0)
                .toFixed(2)}
            </td>
          );
        })}
        <td className="amountInput">${totalExpenditure.toFixed(2)}</td>
        {filteredSources.map((source) => {
          return (
            <td className="amountInput">
              $
              {income
                .filter((inc) => {
                  const date = new Date(inc.date);
                  return (
                    inc.source === source.name && index === date.getMonth()
                  );
                })
                .reduce((acc, inc) => {
                  totalIncome += inc.amount;
                  sumIncome += inc.amount;
                  return acc + inc.amount;
                }, 0)
                .toFixed(2)}
            </td>
          );
        })}
        <td className="amountInput">${totalIncome.toFixed(2)}</td>
        <td className="amountInput">
          ${(totalIncome - totalExpenditure).toFixed(2)}
        </td>
      </tr>
    );
  });

  const totals = (
    <tr>
      <td>Total</td>
      {filteredCategories.map((category) => {
        return (
          <td className="amountInput">
            $
            {expenses
              .reduce((acc, expense) => {
                if (expense.category === category.name) {
                  return acc + expense.amount;
                }
                return acc + 0;
              }, 0)
              .toFixed(2)}
          </td>
        );
      })}
      <td className="amountInput">${sumExpenditures.toFixed(2)}</td>
      {filteredSources.map((source) => {
        return (
          <td className="amountInput">
            $
            {income
              .reduce((acc, inc) => {
                if (inc.category === source.name) {
                  return acc + inc.amount;
                }
                return acc + 0;
              }, 0)
              .toFixed(2)}
          </td>
        );
      })}
      <td className="amountInput">${sumIncome.toFixed(2)}</td>
      <td className="amountInput">
        ${(sumIncome - sumExpenditures).toFixed(2)}
      </td>
    </tr>
  );

  return (
    <table className="notion-table">
      <thead>
        <tr>
          <th>Month</th>
          {categoriesTH}
          <th>Total Expenditure</th>
          {sourcesTH}
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
