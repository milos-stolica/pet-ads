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
  if(image) formData.append('file', image);
  if(user.firstName) formData.append('firstName', user.firstName);
  if(user.lastName) formData.append('lastName', user.lastName);
  if(user.email) formData.append('email', user.email);
  if(user.password) formData.append('password', user.password);
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
      .then(response => handleAxiosResponse(response.status, response.data.user, registerUserSuccess))
      .catch(err => handleAxiosError(err));
  }
}

export function loginUser(userCredentials) {
  const formData = getFormData(userCredentials);
  return () => {
    return AxiosInstance.post('/auth/login', formData, config)
      .then(response => handleAxiosResponse(response.status, response.data.user, loginUserSuccess))
      .catch(err => handleAxiosError(err));
  }
}

export function loadUserFromStorage(user) {
  return {
    type: types.LOAD_USER_FROM_STORAGE,
    user
  }
}