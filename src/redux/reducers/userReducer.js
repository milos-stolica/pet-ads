import types from "../actions/actionTypes";
import initialState from "../initialState";

function getUserObject(user, loggedIn) {
  return {
    firstName: user.firstName, 
    lastName: user.lastName, 
    email: user.email,
    ads: user.ads,
    image_name: user.image_name,
    _id: user._id,
    loggedIn
  }
}

function userReducer(state = initialState.user, action) {
  const user = action.user ? action.user : {};
  const loggedIn = action.user && action.user.loggedIn;
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS:
      Object.keys(user).length !== 0 && localStorage.setItem('user', JSON.stringify(getUserObject(user, false)));
      return {...state, ...getUserObject(user, false)};
    case types.LOGIN_USER_SUCCESS:
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(getUserObject(user, true)));
      return {...state, ...getUserObject(user, true)};
    case types.LOGOUT_USER_SUCCESS:
      localStorage.removeItem('user');
      return {...state, ...getUserObject({}, false)};
    case types.LOAD_USER_FROM_STORAGE:
      return {...state, ...getUserObject(user, loggedIn)};
    default:
      return state;
  }
};

export default userReducer;