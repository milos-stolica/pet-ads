import axios from "axios";
const baseURL = 'http://localhost:3001';
const timeout = 3000;

const AxiosInstance = axios.create(
  {
    baseURL,
    timeout
  }
)

AxiosInstance.interceptors.request.use((config) => {
  //https://levelup.gitconnected.com/using-jwt-in-your-react-redux-app-for-authorization-d31be51a50d2
  //add jwt from storage
  /* const newHeaders = {...config.headers, 'Authorization' : 'jwt1929029001902092'}
  return {...config, headers: newHeaders}; */
  return config;
}, (error) => {
  //error during request
  Promise.reject(error);
});

export default AxiosInstance;