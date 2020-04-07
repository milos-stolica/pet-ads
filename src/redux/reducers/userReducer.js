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
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(getUserObject(action.user, false)));
      return {...state, ...getUserObject(action.user, false)};
    case types.LOGIN_USER_SUCCESS:
      return {...state, ...getUserObject(action.user, true)};
    case types.LOGOUT_USER_SUCCESS:
      return {...state, ...getUserObject({}, false)};
    case types.LOAD_USER_FROM_STORAGE:
      const loggedIn = action.user && action.user.loggedIn;
      return {...state, ...getUserObject(action.user, loggedIn)};
    default:
      return state;
  }
};

export default userReducer;