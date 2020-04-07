import types from "./actionTypes";
import AxiosInstance, { handleAxiosResponse, handleAxiosError } from "../../services/Axios";

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

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
}

export function registerUser(user, image) {
  const formData = getFormData(user, image);
  return () => {
    return AxiosInstance.post('/auth/register', formData, config)
      .then(response => {
        return handleAxiosResponse(response.status, response.data.user, registerUserSuccess);
      })
      .catch(err => {
        return handleAxiosError(err);
      })
  }
}

export function loadUserFromStorage(user) {
  return {
    type: types.LOAD_USER_FROM_STORAGE,
    user
  }
}