const db = require('../config/database');

class TaskService {
  static async createTask(userId, { title, description }) {
    const [id] = await db('tasks').insert({
      user_id: userId,
      title,
      description: description || null,
      status: 'Pending'
    });
    return db('tasks').where({ id }).first();
  }

  static async getTasks(user) {
    const query = db('tasks')
      .join('users', 'tasks.user_id', 'users.id')
      .select('tasks.*', 'users.name as creator_name', 'users.email as creator_email');

    if (user.role !== 'admin') {
      query.where('tasks.user_id', user.id);
    }
    return query.orderBy('tasks.created_at', 'desc');
  }

  static async getTaskById(taskId, user) {
    const task = await db('tasks')
      .join('users', 'tasks.user_id', 'users.id')
      .select('tasks.*', 'users.name as creator_name', 'users.email as creator_email')
      .where('tasks.id', taskId)
      .first();

    if (!task) {
      const err = new Error('Task not found');
      err.statusCode = 404;
      throw err;
    }

    if (user.role !== 'admin' && task.user_id !== user.id) {
      const err = new Error('Forbidden: You are not authorized to view this task');
      err.statusCode = 403;
      throw err;
    }

    return task;
  }

  static async updateTask(taskId, user, { title, description }) {
    await this.getTaskById(taskId, user); // Validates existence and authorization

    await db('tasks').where({ id: taskId }).update({
      title,
      description: description || null,
      updated_at: db.fn.now()
    });

    return db('tasks').where({ id: taskId }).first();
  }

  static async updateStatus(taskId, status) {
    const task = await db('tasks').where({ id: taskId }).first();
    if (!task) {
      const err = new Error('Task not found');
      err.statusCode = 404;
      throw err;
    }

    await db('tasks').where({ id: taskId }).update({
      status,
      updated_at: db.fn.now()
    });

    return db('tasks').where({ id: taskId }).first();
  }
}

module.exports = TaskService;
