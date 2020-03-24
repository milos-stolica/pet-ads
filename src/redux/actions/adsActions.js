import types from "./actionTypes";
import AxiosInstance from "../../services/Axios";

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

export function loadAds() {
  return (dispatch) => {
    AxiosInstance.get('/ads')
      .then(response => { 
        if(response.data.length > 0) dispatch(loadAdsSuccess(response.data))
      })
      .catch(err => console.log(err));
  }
}

export function addAd(ad, image) {
  const formData = GetFormData(ad, image);
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  return dispatch => {
    AxiosInstance.post('/ads', formData, config)
    .then(response => dispatch(addAdSuccess(response.data)))
    .catch(err => console.log(err))
  }
}

export function updateAd(ad, image) {
  const formData = GetFormData(ad, image);
  formData.append('id', ad._id);
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  return dispatch => {
    return AxiosInstance.put('/ads', formData, config)
    .then(response => dispatch(updateAdSuccess(response.data)))
    .catch(err => console.log(err));
  }
}

function GetFormData(ad, image) {
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