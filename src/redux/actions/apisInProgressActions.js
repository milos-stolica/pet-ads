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