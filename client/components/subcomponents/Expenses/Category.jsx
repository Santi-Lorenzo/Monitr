import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../actions/actions";

const Category = (props) => {
  const categories = useSelector((state) => state.categories.categories);
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

  const handleAddCategory = () => {
    if (input.length > 0) {
      dispatch(actions.addCategoryThunk({ name: input, selected: false }));
      setInput("");
    }
  };

  const handleDeleteCategory = (index) => {
    dispatch(actions.deleteCategoryThunk(categories[index]));
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleCategory = (index) => {
    const copy = [...categories];
    copy[index].selected = true;
    props.handleCategorySelection(copy[index].name);
    dispatch(actions.updateCategoryThunk(copy[index]));
    setDisplay(copy[index].name);
    // dispatch(actions.setSelectedCategory(copy[index].name));
    handleDropDown();
  };

  const handleKey = (event) => {
    console.log(event.key);
  };

  const dropDown = categories.map((category, index) => {
    return (
      <li key={category._id} className="dropDownListItem">
        <div onClick={() => handleCategory(index)} className="dropDownItem">
          {category.name}
        </div>
        <button
          className="dropDownDeleteBtn"
          onClick={() => handleDeleteCategory(index)}
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
              placeholder="create category"
              onChange={handleInputChange}
            />
            <button onClick={handleAddCategory}>Add</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
