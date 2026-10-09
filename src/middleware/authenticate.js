const { verifyToken } = require('../utils/jwt');
const ApiResponse = require('../utils/api-response');
const db = require('../config/database');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.error(res, 'Authentication token missing or invalid format', null, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    const user = await db('users').where({ id: decoded.id }).first();
    if (!user) {
      return ApiResponse.error(res, 'User session expired or user no longer exists', null, 401);
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    return ApiResponse.error(res, 'Invalid or expired token', null, 401);
  }
};

module.exports = authenticate;
