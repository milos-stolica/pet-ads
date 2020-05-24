import axios from "axios";
import { decrementAPIsInProgress } from '../redux/actions/apisInProgressActions';
import dispatch from "../index";
import { host } from '../utils/constants'
const baseURL = host;
const timeout = 25000;

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
);

export default AxiosInstance;

export function handleAxiosResponse(status, data, action) {
  if(status < 400) {
    dispatch(action(data));
  }
  dispatch(decrementAPIsInProgress());
  return status;
}

export function handleAxiosError(err) {
  dispatch(decrementAPIsInProgress());
  console.log(err);
  return 500;
}