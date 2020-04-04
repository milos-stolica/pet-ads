import types from "./actionTypes";
import AxiosInstance from "../../services/Axios";

function registerUserSuccess(user) {
  return {
    type: types.REGISTER_USER_SUCCESS,
    user
  }
}

function loginUserSuccess(user) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user
  }
}

function logoutUserSuccess() {
  return {
    type: types.LOGOUT_USER_SUCCESS
  }
}

function getFormData(user, image) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('firstName', user.firstName);
  formData.append('lastName', user.lastName);
  formData.append('email', user.email);
  formData.append('password', user.password);
  return formData;
}

export function registerUser(user, image) {
  const formData = getFormData(user, image);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  //TODO stavi usera i u local storage
  return dispatch => {
    return AxiosInstance.post('/auth/register', formData, config)
    .then(response => dispatch(registerUserSuccess(response.data)))
    .catch(err => console.log(err));
  }
}