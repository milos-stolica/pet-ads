import axios from "axios";
import types from "./actionTypes";
import { handleAxiosResponse, handleAxiosError } from "../../services/Axios";

function loadStatesSuccess(states) {
  return {
    type: types.LOAD_STATES_SUCCESS,
    states
  }
}

function extractStatesNameAndCode(states) {
  return states.map(stateData => { return { name: stateData.name, code: stateData.alpha2Code }})
}

const config = {
  headers: {
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"ajayakv-rest-countries-v1.p.rapidapi.com",
    "x-rapidapi-key":"6a63ee533amshc6ad9189901e80ep16518cjsnf819d1dbe9ee"
  }, 
  validateStatus: () => {
    return true;
  }
}

export function loadStates() {
  return () => {
    return axios.get('https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all', config)
    .then(response => {
      const statesData = extractStatesNameAndCode(response.data);
      return handleAxiosResponse(response.status, statesData, loadStatesSuccess);
    })
    .catch(err => handleAxiosError(err));
  }
}