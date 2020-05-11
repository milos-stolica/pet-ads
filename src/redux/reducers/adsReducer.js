import types from "../actions/actionTypes";
import initialState from "../initialState";

function adsReducer(state = initialState.ads, action) {
  switch(action.type) {
    case types.LOAD_ADS_SUCCESS:
      return action.ads;
    case types.ADD_AD_SUCCESS:
      return [...state, action.ad];
    case types.UPDATE_AD_SUCCESS:
      return state.map(ad => ad._id === action.ad._id ? action.ad : ad);
    case types.DELETE_AD_SUCCESS:
      return state.filter(ad => ad._id !== action.ad._id);
    default:
      return state;
  }
};

export default adsReducer;