import types from "./actionTypes";
import AxiosInstance, { handleAxiosResponse, handleAxiosError } from "../../services/Axios";
import { incrementAPIsInProgress, decrementAPIsInProgress } from './apisInProgressActions';

function loadSubscriptionsSuccess(subscriptions) {
  return {
    type: types.LOAD_SUBSCRIPTIONS_SUCCESS,
    subscriptions
  }
}

function addSubscriptionsSuccess(subscription) {
  return {
    type: types.ADD_SUBSCRIPTION_SUCCESS,
    subscription
  }
}

function updateSubscriptionsSuccess(subscription) {
  return {
    type: types.UPDATE_SUBSCRIPTION_SUCCESS,
    subscription
  }
}

function getFormData(subscription) {
  const formData = new FormData();
  formData.append('petType', subscription.petType);
  formData.append('city', subscription.city);
  formData.append('state', subscription.state);
  formData.append('adType', subscription.adType);
  return formData;
}

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
}

export function loadSubscriptions() {
  return (dispatch) => {
    dispatch(incrementAPIsInProgress());
    return AxiosInstance.get('/subscriptions')
    .then(response => { 
      if(response.data.length === 0) {
        dispatch(decrementAPIsInProgress());
        return response.status;
      }
      return handleAxiosResponse(response.status, response.data, loadSubscriptionsSuccess);
    })
    .catch(err => handleAxiosError(err));
  }
}

export function addSubscription(subscription) {
  const formData = getFormData(subscription);
  return (dispatch) => {
    dispatch(incrementAPIsInProgress());
    return AxiosInstance.post('/subscriptions', formData, config)
    .then(response => handleAxiosResponse(response.status, response.data, addSubscriptionsSuccess))
    .catch(err => handleAxiosError(err));
  }
}

export function updateSubscription(subscription) {
  const formData = getFormData(subscription);
  formData.append('id', subscription._id);
  return (dispatch) => {
    dispatch(incrementAPIsInProgress());
    return AxiosInstance.put('/subscriptions', formData, config)
    .then(response => handleAxiosResponse(response.status, response.data, updateSubscriptionsSuccess))
    .catch(err => handleAxiosError(err));
  }
}