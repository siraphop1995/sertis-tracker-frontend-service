export default class HelperMethods {
  errorHandler = error => {
    if (typeof(error.response) !== 'undefined') {
      const { data } = error.response;
      console.error(data.message + ', found in ' + data.location);
    }
    else {
      console.error(error);
    }
  };
}
