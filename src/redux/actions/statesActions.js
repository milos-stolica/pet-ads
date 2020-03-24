import axios from "axios";
import types from "./actionTypes";

function loadStatesSuccess(states) {
  return {
    type: types.LOAD_STATES_SUCCESS,
    states
  }
}

export function loadStates() {
  return dispatch => {
      const config = {
        headers: {
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"ajayakv-rest-countries-v1.p.rapidapi.com",
            "x-rapidapi-key":"6a63ee533amshc6ad9189901e80ep16518cjsnf819d1dbe9ee"
        }
      }
      axios.get('https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all', config)
      .then(response => {dispatch(loadStatesSuccess(response.data.map(stateData => {
         return { name: stateData.name, code: stateData.alpha2Code }
        })))})
      .catch(err => console.log(err));
  }
}