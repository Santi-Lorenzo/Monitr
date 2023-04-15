import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../actions/actions";

const Source = (props) => {
  const sources = useSelector((state) => state.sources.sources);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("Select");
  // const selectedCategory = useSelector(
  //   (state) => state.categories.selectedCategory
  // );
  const [triggerDropDown, setTriggerDropDown] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleDropDown = () => {
    setTriggerDropDown(!triggerDropDown);
  };

  const handleAddSource = () => {
    if (input.length > 0) {
      dispatch(actions.addSourceThunk({ name: input }));
      setInput("");
    }
  };

  const handleDeleteSource = (index) => {
    dispatch(actions.deleteSourceThunk(sources[index]));
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSource = (index) => {
    const copy = [...sources];
    props.handleSourceSelection(copy[index].name);
    setDisplay(copy[index].name);
    // dispatch(actions.setSelectedCategory(copy[index].name));
    handleDropDown();
  };

  const handleKey = (event) => {
    console.log(event.key);
  };

  const dropDown = sources.map((source, index) => {
    return (
      <li key={source._id} className="dropDownListItem">
        <div onClick={() => handleSource(index)} className="dropDownItem">
          {source.name}
        </div>
        <button
          className="dropDownDeleteBtn"
          onClick={() => handleDeleteSource(index)}
        >
          X
        </button>
      </li>
    );
  });

  return (
    <>
      <div
        // tabIndex={0}
        onKeyDown={handleKey}
        className="categoryDisplay"
        onClick={handleDropDown}
      >
        {display}
      </div>

      {triggerDropDown && (
        <div className="dropDownContainer">
          <ul>{dropDown}</ul>
          <div className="addCategory">
            <input
              ref={inputRef}
              className="categoryInput"
              value={input}
              type="text"
              placeholder="create source"
              onChange={handleInputChange}
            />
            <button onClick={handleAddSource}>Add</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Source;
