import axios from "axios";
import { decrementAPIsInProgress } from '../redux/actions/apisInProgressActions';
import dispatch from "../index";
const baseURL = 'http://ec2-3-18-105-147.us-east-2.compute.amazonaws.com';
const timeout = 10000;

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