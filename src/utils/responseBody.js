const errorResponseBody = {
  error: "",
  success: false,
  message: "Failed to fetch movie",
  data: {},
};

const successResponseBody = {
  error: {},
  success: true,
  message: "Successfully moive fetched",
  data: {},
};

module.exports = { errorResponseBody, successResponseBody };
