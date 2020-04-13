const errors = new Map();
errors.set(400, {description: 'Bad request.', suggestion: 'Please follow client side validation rules.'});
errors.set(401, {description: 'Unauthorized request.', suggestion: 'Action is unreachable at all or you must sign in to procceed.'});
errors.set(404, {description: 'Resource not found.', suggestion: 'Sorry. Resource not found'});
errors.set(409, {description: 'Email address already in use.', suggestion: 'Please use different email address to avoid conflict.'});
errors.set(NaN, {description: 'Uppps. Something went wrong', suggestion: 'Please try again after few minutes.'});

export default class Errors {
  static getErrorExplanation(errorCode) {
    const parsedErrorCode = parseInt(errorCode, 10);
    if(errors.has(parsedErrorCode)) {
      return errors.get(parsedErrorCode);
    } else {
      return errors.get(NaN);
    }
  }
}