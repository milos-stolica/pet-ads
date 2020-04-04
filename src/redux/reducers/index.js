import { combineReducers } from "redux";
import adsReducer from "./adsReducer";
import statesReducer from "./statesReducer";
import userReducer from "./userReducer";
import typesReducer from "./typesReducer";

const rootReducer = combineReducers({
  ads: adsReducer,
  states: statesReducer,
  user: userReducer,
  types: typesReducer
});

export default rootReducer;