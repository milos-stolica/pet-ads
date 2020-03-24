import types from "./actionTypes";
import AxiosInstance from "../../services/Axios";

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
    AxiosInstance.get('/types/ads')
      .then(response =>  dispatch(loadAdTypesSuccess(response.data)))
      .catch(err => console.log(err));
  }
}

export function loadPetTypes() {
  return (dispatch) => {
    AxiosInstance.get('/types/pets')
      .then(response =>  dispatch(loadPetTypesSuccess(response.data)))
      .catch(err => console.log(err));
  }
}

