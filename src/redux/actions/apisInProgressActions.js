import types from "./actionTypes";

export function incrementAPIsInProgress() {
  return {
    type: types.INCREMENT_APIS_IN_PROGRESS
  }
}

export function decrementAPIsInProgress() {
  return {
    type: types.DECREMENT_APIS_IN_PROGRESS
  }
}

export function loadingUserSubscriptionsStarted() {
  return {
    type: types.LOADING_USER_SUBSCRIPTIONS_STARTED
  }
}

export function loadingUserSubscriptionsFinished() {
  return {
    type: types.LOADING_USER_SUBSCRIPTIONS_FINISHED
  }
}

export function loadingAdsStarted() {
  return {
    type: types.LOADING_ADS_STARTED
  }
}

export function loadingAdsFinished() {
  return {
    type: types.LOADING_ADS_FINISHED
  }
}