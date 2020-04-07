import types from "./actionTypes";
import AxiosInstance, { handleAxiosResponse, handleAxiosError } from "../../services/Axios";

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

function getFormData(ad, image) {
  const formData = new FormData();
  formData.append('file', image);
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
  return () => {
    return AxiosInstance.get('/ads')
    .then(response => { 
      if(response.data.length === 0) return response.status;
      return handleAxiosResponse(response.status, response.data, loadAdsSuccess);
    })
    .catch(err => handleAxiosError(err));
  }
}

export function addAd(ad, image) {
  const formData = getFormData(ad, image);
  return () => {
    return AxiosInstance.post('/ads', formData, config)
    .then(response => handleAxiosResponse(response.status, response.data, addAdSuccess))
    .catch(err => handleAxiosError(err));
  }
}

export function updateAd(ad, image) {
  const formData = getFormData(ad, image);
  formData.append('id', ad._id);
  return () => {
    return AxiosInstance.put('/ads', formData, config)
    .then(response => handleAxiosResponse(response.status, response.data, updateAdSuccess))
    .catch(err => handleAxiosError(err));
  }
}