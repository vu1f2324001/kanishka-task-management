const ApiResponse = require('../utils/api-response');

module.exports = (err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  return ApiResponse.error(
    res,
    process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    null,
    500
  );
};
