import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../actions/actions";

const ExpensesTable = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [editingCell, setEditingCell] = useState({
    index: null,
    property: null,
  });

  useEffect(() => {
    if (editingCell.index !== null && editingCell.property !== null) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const handleCellClick = (index, property) => {
    setEditingCell({ index, property });
  };

  const handleInputChange = (event, index, property) => {
    const newData = [...expenses];
    newData[index][property] = event.target.value;
    dispatch(actions.setState(newData));
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
      name: null,
      amount: null,
      date: null,
      category: null,
    };

    const updatedExpenses = [...expenses, newExpense];

    dispatch(actions.setState(updatedExpenses));
  };

  const handleDeleteRow = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    dispatch(actions.setState(updatedExpenses));
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
                    value={expense.name}
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
                onClick={() => handleCellClick(index, "amount")}
              >
                {editingCell.index === index &&
                editingCell.property === "amount" ? (
                  <input
                    ref={inputRef}
                    className="nameInput"
                    type="text"
                    value={expense.amount}
                    onChange={(event) =>
                      handleInputChange(event, index, "amount")
                    }
                    onKeyDown={handleEnterKeyPress}
                  />
                ) : (
                  expense.amount
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
                    type="text"
                    value={expense.date}
                    onChange={(event) =>
                      handleInputChange(event, index, "date")
                    }
                    onKeyDown={handleEnterKeyPress}
                  />
                ) : (
                  expense.date
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
                  <input
                    ref={inputRef}
                    className="nameInput"
                    type="text"
                    value={expense.category}
                    onChange={(event) =>
                      handleInputChange(event, index, "category")
                    }
                    onKeyDown={handleEnterKeyPress}
                  />
                ) : (
                  expense.category
                )}
              </td>
              <button
                onClick={() => handleDeleteRow(index)}
                className="deleteBtn"
              >
                X
              </button>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              className="leftBorder rightBorder"
              colSpan="4"
              onClick={handleAddRow}
            >
              + New
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpensesTable;
