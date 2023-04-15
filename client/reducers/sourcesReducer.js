import * as types from "../constants/actionTypes";

const initialState = {
  sources: [],
  selectedSource: "Select",
};

const sourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SOURCES:
      return {
        ...state,
        sources: action.payload,
      };

    case types.UPDATE_SOURCE:
      const index = state.sources.findIndex(
        (obj) => obj._id === action.payload._id
      );

      const updatedSources = [
        ...state.sources.slice(0, index),
        action.payload,
        ...state.sources.slice(index + 1),
      ];

      return {
        ...state,
        sources: updatedSources,
      };

    case types.ADD_SOURCE:
      const newSources = [...state.sources, action.payload];
      return {
        ...state,
        sources: newSources,
      };

    case types.DELETE_SOURCE:
      const deletedSources = state.sources.filter(
        (obj) => obj._id !== action.payload
      );
      return {
        ...state,
        sources: deletedSources,
      };

    case types.SET_SELECTED_SOURCE:
      return {
        ...state,
        selectedSource: action.payload,
      };

    default:
      return state;
  }
};

export default sourceReducer;
