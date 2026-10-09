const ApiResponse = require('../utils/api-response');

const authorize = (allowedRoles = ['admin']) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return ApiResponse.error(res, 'Access forbidden: Insufficient permissions', null, 403);
    }
    next();
  };
};

module.exports = authorize;
