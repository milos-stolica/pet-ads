import types from "../actions/actionTypes";
import initialState from "../initialState";

function apisInProgressReducer(state = initialState.apisInProgress, action) {
  switch(action.type) {
    case types.INCREMENT_APIS_IN_PROGRESS:
      console.log('APIs in progress: ', state + 1);
      return state + 1;
    case types.DECREMENT_APIS_IN_PROGRESS:
      console.log('APIs in progress: ', state - 1);
      return state - 1;
    default:
      return state;
  }
};

export default apisInProgressReducer;