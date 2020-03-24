import { combineReducers } from "redux";
import adsReducer from "./adsReducer";
import statesReducer from "./statesReducer";
import typesReducer from "./typesReducer";

const rootReducer = combineReducers({
  ads: adsReducer,
  states: statesReducer,
  types: typesReducer
});

export default rootReducer;