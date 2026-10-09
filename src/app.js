const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const ApiResponse = require('./utils/api-response');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  return ApiResponse.success(res, 'API service is operational', { timestamp: new Date().toISOString() }, 200);
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 & Centralized Error Handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
