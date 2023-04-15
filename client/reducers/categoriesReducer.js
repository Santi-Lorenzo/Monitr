import * as types from "../constants/actionTypes";

const initialState = {
  categories: [],
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case types.UPDATE_CATEGORY:
      const index = state.categories.findIndex(
        (obj) => obj._id === action.payload._id
      );

      const updatedCategories = [
        ...state.categories.slice(0, index),
        action.payload,
        ...state.categories.slice(index + 1),
      ];

      return {
        ...state,
        categories: updatedCategories,
      };

    case types.ADD_CATEGORY:
      const newCategories = [...state.categories, action.payload];
      return {
        ...state,
        categories: newCategories,
      };

    case types.DELETE_CATEGORY:
      const deletedCategories = state.categories.filter(
        (obj) => obj._id !== action.payload
      );
      return {
        ...state,
        categories: deletedCategories,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
