import types from "../actions/actionTypes";
import initialState from "../initialState";

function apisInProgressReducer(state = initialState.axiosActionsInProgress, action) {
  switch(action.type) {
    case types.INCREMENT_APIS_IN_PROGRESS:
      return { ...state, apisInProgress: state.apisInProgress + 1 };
    case types.DECREMENT_APIS_IN_PROGRESS:
      return { ...state, apisInProgress: state.apisInProgress - 1 };
    case types.LOADING_USER_SUBSCRIPTIONS_STARTED:
      return { ...state, loadingUserSubscriptions: true }
    case types.LOADING_USER_SUBSCRIPTIONS_FINISHED:
      return { ...state, loadingUserSubscriptions: false }
    case types.LOADING_ADS_STARTED:
      return { ...state, loadingAds: true }
      case types.LOADING_ADS_FINISHED:
      return { ...state, loadingAds: false }
    default:
      return state;
  }
};

export default apisInProgressReducer;