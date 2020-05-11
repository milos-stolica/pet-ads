import types from "../actions/actionTypes";
import initialState from "../initialState";

function userReducer(state = initialState.user, action) {
  const user = action.user ? action.user : {};
  const userLS = JSON.parse(localStorage.getItem('user'));
  let ads;
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS:
      Object.keys(user).length !== 0 && localStorage.setItem('user', JSON.stringify(user));
      return user;
    case types.LOGIN_USER_SUCCESS:
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    case types.LOGOUT_USER_SUCCESS:
      localStorage.removeItem('user');
      return {};
    case types.LOAD_USER_FROM_STORAGE:
      return user;
    case types.ADD_AD_SUCCESS:
      ads = [...state.ads, action.ad._id];
      localStorage.setItem('user', JSON.stringify({...userLS, ads}));
      return {...state, ads};
    case types.ADD_SUBSCRIPTION_SUCCESS:
      const subscriptions = [...state.subscriptions, action.subscription._id];
      localStorage.setItem('user', JSON.stringify({...userLS, subscriptions}));
      return {...state, subscriptions};
    case types.DELETE_AD_SUCCESS:
      ads = state.ads.filter(ad => ad !== action.ad._id);
      localStorage.setItem('user', JSON.stringify({...userLS, ads}));
      return {...state, ads};
    default:
      return state;
  }
};

export default userReducer;