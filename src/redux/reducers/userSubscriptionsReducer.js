import types from "../actions/actionTypes";
import initialState from "../initialState";

function userSubscriptionsReducer(state = initialState.userSubscriptions, action) {
  switch(action.type) {
    case types.LOAD_SUBSCRIPTIONS_SUCCESS:
      return action.subscriptions;
    case types.ADD_SUBSCRIPTION_SUCCESS:
      return [action.subscription, ...state];
    case types.UPDATE_SUBSCRIPTION_SUCCESS:
      return state.map(subscription => subscription._id === action.subscription._id ? action.subscription : subscription);
    case types.DELETE_SUBSCRIPTION_SUCCESS:
      return state.filter(subscription => subscription._id !== action.subscription._id);
    default:
      return state;
  }
};

export default userSubscriptionsReducer;