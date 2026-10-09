const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(255),
  description: z.string().trim().optional().nullable()
});

const updateTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title cannot be empty').max(255),
  description: z.string().trim().optional().nullable()
});

const updateStatusSchema = z.object({
  status: z.enum(['Pending', 'In Progress', 'Testing', 'Completed'], {
    errorMap: () => ({ message: "Status must be 'Pending', 'In Progress', 'Testing', or 'Completed'" })
  })
});

module.exports = { createTaskSchema, updateTaskSchema, updateStatusSchema };
