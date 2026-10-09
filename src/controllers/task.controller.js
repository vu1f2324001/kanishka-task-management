const TaskService = require('../services/task.service');
const ApiResponse = require('../utils/api-response');

class TaskController {
  static async create(req, res, next) {
    try {
      const task = await TaskService.createTask(req.user.id, req.body);
      return ApiResponse.success(res, 'Task created successfully', task, 201);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const tasks = await TaskService.getTasks(req.user);
      return ApiResponse.success(res, 'Tasks retrieved successfully', tasks, 200);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    try {
      const task = await TaskService.getTaskById(Number(req.params.id), req.user);
      return ApiResponse.success(res, 'Task details retrieved', task, 200);
    } catch (err) {
      if (err.statusCode) {
        return ApiResponse.error(res, err.message, null, err.statusCode);
      }
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const task = await TaskService.updateTask(Number(req.params.id), req.user, req.body);
      return ApiResponse.success(res, 'Task updated successfully', task, 200);
    } catch (err) {
      if (err.statusCode) {
        return ApiResponse.error(res, err.message, null, err.statusCode);
      }
      next(err);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const task = await TaskService.updateStatus(Number(req.params.id), req.body.status);
      return ApiResponse.success(res, 'Task status updated successfully', task, 200);
    } catch (err) {
      if (err.statusCode) {
        return ApiResponse.error(res, err.message, null, err.statusCode);
      }
      next(err);
    }
  }
}

module.exports = TaskController;
