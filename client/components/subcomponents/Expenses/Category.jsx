import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CategoryDropDown = () => {
  // const categories = useSelector((state) => state.categories.categories);

  const categories = ["food", "rent", "entertainment", "medical"];
  const dispatch = useDispatch();
  const [category, setCategory] = useState("Select");
  const [triggerDropDown, setTriggerDropDown] = useState(false);

  useEffect(() => {
    setTriggerDropDown(true);
  }, []);

  const handleDropDown = () => {
    setTriggerDropDown(!triggerDropDown);
  };

  const handleAddCantegory = () => {
    dispatch(actions.addCategory);
  };
  const dropDown = categories.map((category, index) => {
    return (
      <li className="dropDownListItem">
        <div className="dropDownItem">{category}</div>
        <button className="dropDownDeleteBtn">X</button>
      </li>
    );
  });

  return (
    <>
      <div className="categoryDisplay" onClick={handleDropDown}>
        {category}
      </div>

      {triggerDropDown && (
        <div className="dropDownContainer">
          <ul>{dropDown}</ul>
          <div className="addCategory" onClick={handleAddCantegory}>
            New +
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryDropDown;
