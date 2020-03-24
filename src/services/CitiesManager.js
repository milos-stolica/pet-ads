import axios from "axios";

export default class CitiesManager {
  static async getCities(stateCode, population) {
    let cities = [];

    const getConfig = function(stateCode, population, page) {
      return {
        "method":"GET",
        "url":`https://countries-cities.p.rapidapi.com/location/country/${stateCode}/city/list`,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"countries-cities.p.rapidapi.com",
        "x-rapidapi-key":"6a63ee533amshc6ad9189901e80ep16518cjsnf819d1dbe9ee"
        },"params":{
        "page":`${page}`,
        "per_page":"20",
        "format":"json",
        "population": `${population}`
        }
      }
    }

    const getCitiesPromise = function (config) {
      return new Promise((resolve, reject) => {
        axios(config)
        .then(response => resolve(response))
        .catch(err => reject(err))   
      });
    };

    return new Promise(async(resolve, reject) => {
      try {
        let pageNumber = 1;
        let config = getConfig(stateCode, population, pageNumber);
        let response = await getCitiesPromise(config);
        cities = [...cities, ...response.data.cities];
        //this is for merging results from more API calls, but because rate limit show first 20 cities for testing purposes
        /* let requestsNumber = response.data.total_pages - 1;
        while(requestsNumber > 0) {
          requestsNumber--;
          config = getConfig(stateCode, population, ++pageNumber);
          response = await getCitiesPromise(config);
          cities = [...cities, ...response.data.cities];
        } */
        resolve(cities);
      } catch(err) {
        reject(err);
      }
    });

  }
}