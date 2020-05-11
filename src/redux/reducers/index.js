import { combineReducers } from 'redux';
import adsReducer from './adsReducer';
import statesReducer from './statesReducer';
import userReducer from './userReducer';
import typesReducer from './typesReducer';
import userSubscriptionsReducer from './userSubscriptionsReducer';
import apisInProgressReducer from './apisInProgressReducer';

const rootReducer = combineReducers({
  ads: adsReducer,
  states: statesReducer,
  user: userReducer,
  types: typesReducer,
  userSubscriptions: userSubscriptionsReducer,
  apisInProgress: apisInProgressReducer
});

export default rootReducer;