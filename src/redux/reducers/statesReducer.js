import types from "../actions/actionTypes";
import initialState from "../initialState";

function statesReducer(state = initialState.states, action) {
  switch(action.type) {
    case types.LOAD_STATES_SUCCESS:
      return action.states;
    default:
      return state;
  }
};

export default statesReducer;