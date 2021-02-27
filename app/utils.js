const getResponseObj = function (body, message, status) {
  return {
    Body: body,
    Message: message,
    Status: status,
  };
};

// export functions
module.exports = {
  getResponseObj: getResponseObj,
};
