import types from "../actions/actionTypes";
import initialState from "../initialState";

function userReducer(state = initialState.user, action) {
  const user = action.user ? action.user : {};
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
      const ads = [...state.ads, action.ad._id];
      const userLS = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({...userLS, ads}));
      return {...state, ads}
    default:
      return state;
  }
};

export default userReducer;