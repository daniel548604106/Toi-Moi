const catchErrors = (error) => {
  let errorMsg;
  if (error.response) {
    // If the request was made and the server does not respond with a status code in the range of 2xx
    errorMsg = error.response.data;
    console.log(errorMsg);
  } else if (error.request) {
    // If the request was made and no response was received from server
    errorMsg = error.request;
    console.error(errorMsg);
  } else {
    // If sth else happened while making the request
    errorMsg = error.message;
    console.error(errorMsg);
  }

  return errorMsg;
};

export default catchErrors;
