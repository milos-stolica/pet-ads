import types from "./actionTypes";
import AxiosInstance, { handleAxiosResponse, handleAxiosError } from "../../services/Axios";
import { incrementAPIsInProgress } from './apisInProgressActions';

function loadAdTypesSuccess(ad_types) {
  return {
    type: types.LOAD_AD_TYPES_SUCCESS,
    ad_types
  }
}

function loadPetTypesSuccess(pet_types) {
  return {
    type: types.LOAD_PET_TYPES_SUCCESS,
    pet_types
  }
}

export function loadAdTypes() {
  return (dispatch) => {
    dispatch(incrementAPIsInProgress());
    return AxiosInstance.get('/types/ads')
    .then(response => handleAxiosResponse(response.status, response.data, loadAdTypesSuccess))
    .catch(err => handleAxiosError(err));
  }
}

export function loadPetTypes() {
  return (dispatch) => {
    dispatch(incrementAPIsInProgress());
    return AxiosInstance.get('/types/pets')
      .then(response => handleAxiosResponse(response.status, response.data, loadPetTypesSuccess))
      .catch(err => handleAxiosError(err));
  }
}

