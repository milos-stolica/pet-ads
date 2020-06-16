import types from "../actions/actionTypes";
import initialState from "../initialState";

function typesReducer(state = initialState.types, action) {
  switch(action.type) {
    case types.LOAD_PET_TYPES_SUCCESS:
      return {...state, pets: action.petTypes};
    case types.LOAD_AD_TYPES_SUCCESS:
      return {...state, ads: action.adTypes};
    default:
      return state;
  }
};

export default typesReducer;