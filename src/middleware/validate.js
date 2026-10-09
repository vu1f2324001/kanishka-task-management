const ApiResponse = require('../utils/api-response');

const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message
      }));
      return ApiResponse.error(res, 'Validation failed', issues, 400);
    }
    req.body = result.data;
    next();
  } catch (err) {
    return ApiResponse.error(res, 'Invalid request data', null, 400);
  }
};

module.exports = validate;
