import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../actions/actions";
import CategoryDropDown from "./CategoryDropDown";

const ExpensesTable = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [editingCell, setEditingCell] = useState({
    index: null,
    property: null,
  });

  useEffect(() => {
    if (
      editingCell.index !== null &&
      editingCell.property !== null &&
      editingCell.property !== "category"
    ) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const handleCellClick = (index, property) => {
    setEditingCell({ index, property });
  };

  const handleInputChange = (event, index, property) => {
    const newData = [...expenses];
    console.log("gg", event.target.value);
    newData[index][property] = event.target.value;

    dispatch(actions.updateStateThunk(newData[index]));
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      setEditingCell({
        index: null,
        property: null,
      });
    }
  };

  const handleAddRow = () => {
    const newExpense = {
      name: "",
      amount: "",
      date: "",
      category: "",
    };

    dispatch(actions.addStateThunk(newExpense));
  };

  const handleDeleteRow = (index) => {
    if (expenses.length != 1) {
      dispatch(actions.deleteStateThunk(expenses[index]));
    }
  };

  const displayDate = (dateString) => {
    const timestamp = Date.parse(dateString);
    const dateObject = new Date(timestamp);
    const utcDate = new Date(
      dateObject.getUTCFullYear(),
      dateObject.getUTCMonth(),
      dateObject.getUTCDate()
    );
    return utcDate.toLocaleDateString();
  };

  return (
    <div className="tableContainer">
      <h2>Expenses</h2>
      <table className="notion-table">
        <thead>
          <tr>
            <th className="leftBorder">Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th className="rightBorder">Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td
                className={
                  editingCell.index === index && editingCell.property === "name"
                    ? "selected leftBorder"
                    : "leftBorder"
                }
                onClick={() => handleCellClick(index, "name")}
              >
                {editingCell.index === index &&
                editingCell.property === "name" ? (
                  <input
                    ref={inputRef}
                    className="nameInput"
                    type="text"
                    value={expense.name || ""}
                    onChange={(event) =>
                      handleInputChange(event, index, "name")
                    }
                    onKeyDown={handleEnterKeyPress}
                  />
                ) : (
                  expense.name
                )}
              </td>
              <td
                className={
                  editingCell.index === index &&
                  editingCell.property === "amount"
                    ? "selected"
                    : ""
                }
                style={{ textAlign: "right" }}
                onClick={() => handleCellClick(index, "amount")}
              >
                {editingCell.index === index &&
                editingCell.property === "amount" ? (
                  <input
                    ref={inputRef}
                    className="nameInput amountInput"
                    type="number"
                    value={expense.amount || ""}
                    onChange={(event) =>
                      handleInputChange(event, index, "amount")
                    }
                    onKeyDown={handleEnterKeyPress}
                  />
                ) : expense.amount ? (
                  `$${expense.amount.toFixed(2)}`
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  editingCell.index === index && editingCell.property === "date"
                    ? "selected"
                    : ""
                }
                onClick={() => handleCellClick(index, "date")}
              >
                {editingCell.index === index &&
                editingCell.property === "date" ? (
                  <input
                    ref={inputRef}
                    className="nameInput"
                    type="date"
                    value={expense.date || ""}
                    onChange={(event) =>
                      handleInputChange(event, index, "date")
                    }
                    onKeyDown={handleEnterKeyPress}
                  />
                ) : expense.date ? (
                  displayDate(expense.date)
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  editingCell.index === index &&
                  editingCell.property === "category"
                    ? "selected rightBorder"
                    : "rightBorder"
                }
                onClick={() => handleCellClick(index, "category")}
              >
                {editingCell.index === index &&
                editingCell.property === "category" ? (
                  <CategoryDropDown />
                ) : (
                  expense.category
                )}
              </td>
              <td className="noBorder">
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="deleteBtn"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th
              className="leftBorder rightBorder"
              colSpan="4"
              onClick={handleAddRow}
            >
              + New
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpensesTable;
