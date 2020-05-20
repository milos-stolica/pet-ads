import types from "./actionTypes";
import AxiosInstance, { handleAxiosResponse, handleAxiosError } from "../../services/Axios";
import { incrementAPIsInProgress, 
         decrementAPIsInProgress,
         loadingAdsStarted,
         loadingAdsFinished } from './apisInProgressActions';

function loadAdsSuccess(ads) {
  return {
    type: types.LOAD_ADS_SUCCESS,
    ads
  }
}

function addAdSuccess(ad) {
  return {
    type: types.ADD_AD_SUCCESS,
    ad
  }
}

function updateAdSuccess(ad) {
  return {
    type: types.UPDATE_AD_SUCCESS,
    ad
  }
}

function deleteAdSuccess(ad) {
  return {
    type: types.DELETE_AD_SUCCESS,
    ad
  }
}

function getFormData(ad) {
  const formData = new FormData();
  formData.append('file', ad.imageFile);
  formData.append('description', ad.description);
  formData.append('type', ad.type);
  formData.append('city', ad.city);
  formData.append('state', ad.state);
  formData.append('phone', ad.phone);
  formData.append('email', ad.email);
  formData.append('price', ad.price);
  formData.append('ad_type', ad.ad_type);
  return formData;
}

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
}

export function loadAds() {
  return (dispatch) => {
    dispatch(incrementAPIsInProgress());
    dispatch(loadingAdsStarted());
    return AxiosInstance.get('/ads')
    .then(response => { 
      dispatch(loadingAdsFinished());
      if(response.data.length === 0) {
        dispatch(decrementAPIsInProgress());
        return response.status;
      }
      return handleAxiosResponse(response.status, response.data, loadAdsSuccess);
    })
    .catch(err => {
      dispatch(loadingAdsFinished());
      handleAxiosError(err);
    });
  }
}

export function addAd(ad) {
  const formData = getFormData(ad);
  return (dispatch) => {
    dispatch(incrementAPIsInProgress());
    return AxiosInstance.post('/ads', formData, config)
    .then(response => handleAxiosResponse(response.status, response.data, addAdSuccess))
    .catch(err => handleAxiosError(err));
  }
}

export function updateAd(ad) {
  const formData = getFormData(ad);
  formData.append('id', ad._id);
  return (dispatch) => {
    dispatch(incrementAPIsInProgress());
    return AxiosInstance.put('/ads', formData, config)
    .then(response => handleAxiosResponse(response.status, response.data, updateAdSuccess))
    .catch(err => handleAxiosError(err));
  }
}

export function deleteAd(id) {
  return (dispatch) => {
    dispatch(incrementAPIsInProgress());
    return AxiosInstance.delete(`/ads/${id}`)
    .then(response => handleAxiosResponse(response.status, response.data, deleteAdSuccess))
    .catch(err => handleAxiosError(err));
  }
}