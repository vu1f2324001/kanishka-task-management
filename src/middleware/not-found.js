const ApiResponse = require('../utils/api-response');

module.exports = (req, res) => {
  return ApiResponse.error(res, `Route not found: ${req.method} ${req.originalUrl}`, null, 404);
};
