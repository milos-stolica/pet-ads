import types from "../actions/actionTypes";
import initialState from "../initialState";

function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS:
      console.log('action.user', action.user);
      return {
        ...state, 
        firstName: action.user.firstName, 
        lastName: action.user.lastName, 
        email: action.user.email,
        ads: action.user.ads,
        image_name: action.user.image_name,
        _id: action.user._id,
        loggedIn: false
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state, 
        firstName: action.user.firstName, 
        lastName: action.user.lastName, 
        email: action.user.email,
        ads: action.user.ads,
        image_name: action.user.image_name,
        _id: action.user._id,
        loggedIn: true
      };
    case types.LOGOUT_USER_SUCCESS:
      return {
        ...state, 
        firstName: undefined, 
        lastName: undefined, 
        email: undefined, 
        ads: undefined,
        image_name: undefined,
        _id: undefined
      };
    default:
      return state;
  }
};

export default userReducer;