import axios from "axios";
import dispatch from "../index";
const baseURL = 'http://localhost:3001';
const timeout = 3000;

const AxiosInstance = axios.create (
  {
    baseURL,
    timeout,
    withCredentials: true,
    //because of problems to get response status in catch statement, make all responses are successfully resolved
    validateStatus: () => {
      return true;
    }
  }
)

export default AxiosInstance;

export function handleAxiosResponse(status, data, action) {
  if(status < 400) dispatch(action(data));
  return status;
}

export function handleAxiosError(err) {
  console.log(err);
  return 500;
}