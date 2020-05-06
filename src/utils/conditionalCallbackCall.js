export function conditionalCallbackExecution(condition, callback, callbackArg) {
  if(condition) {
    callback(callbackArg);
  }
}