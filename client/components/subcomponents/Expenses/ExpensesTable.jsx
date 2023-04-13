import React, { useState, useRef, useEffect } from "react";

const ExpensesTable = () => {
  const inputRef = useRef(null);
  const [editingCell, setEditingCell] = useState({
    index: null,
    property: null,
  });
  const [tableData, setTableData] = useState([
    {
      name: "shoes",
      amount: "120",
      date: "05/05/22",
      category: "clothing",
    },
    {
      name: "groceries",
      amount: "80",
      date: "05/06/22",
      category: "food",
    },
    {
      name: "gas",
      amount: "60",
      date: "05/06/22",
      category: "travel",
    },
    {
      name: "rent",
      amount: "1230",
      date: "05/09/22",
      category: "rent",
    },
  ]);

  useEffect(() => {
    if (editingCell.index !== null && editingCell.property !== null) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const handleCellClick = (index, property) => {
    setEditingCell({ index, property });
  };

  const handleInputChange = (event, index, property) => {
    const newData = [...tableData];
    newData[index][property] = event.target.value;
    setTableData(newData);
  };

  const handleEnterKeyPress = (event) => {
    console.log("key", event.key);
    if (event.key === "Enter") {
      setEditingCell({
        index: null,
        property: null,
      });
    }
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
          {tableData.map((expense, index) => (
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
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="leftBorder rightBorder" colSpan="4">
              + New
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpensesTable;
