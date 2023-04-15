import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../actions/actions";
import Source from "./Source";

const IncomeTable = () => {
  const income = useSelector((state) => state.income.income);
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
      editingCell.property !== "source"
    ) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const handleCellClick = (index, property) => {
    setEditingCell({ index, property });
  };

  const handleInputChange = (event, index, property) => {
    const newData = [...income];
    newData[index][property] = event.target.value;
    dispatch(actions.updateIncomeThunk(newData[index]));
  };

  const handleSourceSelection = (index, property, source) => {
    const newData = [...income];
    newData[index][property] = source;
    dispatch(actions.updateIncomeThunk(newData[index]));
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
    const newIncome = {
      amount: "",
      date: "",
      source: "",
    };

    dispatch(actions.addIncomeThunk(newIncome));
  };

  const handleDeleteRow = (index) => {
    if (income.length != 1) {
      dispatch(actions.deleteIncomeThunk(income[index]));
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
      <h2>Income</h2>
      <table className="notion-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date</th>
            <th className="rightBorder">Income Source</th>
          </tr>
        </thead>
        <tbody>
          {income.map((inc, index) => (
            <tr key={index}>
              <td
                className={
                  editingCell.index === index &&
                  editingCell.property === "amount"
                    ? "selected"
                    : ""
                }
                style={{ textAlign: "right" }}
                onClick={() => handleCellClick(index, "amount")}
                tabIndex={0 + index}
              >
                {editingCell.index === index &&
                editingCell.property === "amount" ? (
                  <input
                    ref={inputRef}
                    className="nameInput amountInput"
                    type="number"
                    value={inc.amount || ""}
                    onChange={(event) =>
                      handleInputChange(event, index, "amount")
                    }
                    onKeyDown={handleEnterKeyPress}
                  />
                ) : inc.amount ? (
                  `$${inc.amount.toFixed(2)}`
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
                tabIndex={1 + index}
              >
                {editingCell.index === index &&
                editingCell.property === "date" ? (
                  <input
                    ref={inputRef}
                    className="nameInput"
                    type="date"
                    value={inc.date || ""}
                    onChange={(event) =>
                      handleInputChange(event, index, "date")
                    }
                    onKeyDown={handleEnterKeyPress}
                  />
                ) : inc.date ? (
                  displayDate(inc.date)
                ) : (
                  ""
                )}
              </td>
              <td
                className={
                  editingCell.index === index &&
                  editingCell.property === "source"
                    ? "selected rightBorder"
                    : "rightBorder"
                }
                onClick={() => handleCellClick(index, "source")}
                tabIndex={2 + index}
              >
                {editingCell.index === index &&
                editingCell.property === "source" ? (
                  <Source
                    handleEnterKeyPress={handleEnterKeyPress}
                    handleSourceSelection={(source) =>
                      handleSourceSelection(index, "source", source)
                    }
                  />
                ) : (
                  inc.source
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
              colSpan="3"
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

export default IncomeTable;
