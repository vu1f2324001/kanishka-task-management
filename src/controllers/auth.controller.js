const AuthService = require('../services/auth.service');
const ApiResponse = require('../utils/api-response');

class AuthController {
  static async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      return ApiResponse.success(res, 'User registered successfully', user, 201);
    } catch (err) {
      if (err.statusCode) {
        return ApiResponse.error(res, err.message, null, err.statusCode);
      }
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const result = await AuthService.login(req.body);
      return ApiResponse.success(res, 'Login successful', result, 200);
    } catch (err) {
      if (err.statusCode) {
        return ApiResponse.error(res, err.message, null, err.statusCode);
      }
      next(err);
    }
  }

  static async getMe(req, res, next) {
    try {
      const user = await AuthService.getProfile(req.user.id);
      return ApiResponse.success(res, 'User profile fetched successfully', user, 200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
