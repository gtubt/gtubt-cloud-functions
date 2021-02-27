const get_response_object = function (body, message, status) {
  return {
    Body: body,
    Message: message,
    Status: status,
  };
};

// export functions
module.exports = {
  get_response_object: get_response_object,
};
