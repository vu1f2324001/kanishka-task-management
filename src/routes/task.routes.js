const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { createTaskSchema, updateTaskSchema, updateStatusSchema } = require('../validators/task.validator');

router.use(authenticate);

router.post('/', validate(createTaskSchema), TaskController.create);
router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getOne);
router.put('/:id', validate(updateTaskSchema), TaskController.update);
router.patch('/:id/status', authorize(['admin']), validate(updateStatusSchema), TaskController.updateStatus);

module.exports = router;
