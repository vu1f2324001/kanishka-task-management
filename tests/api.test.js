const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/database');

describe('Task Management API Test Suite', () => {
  let adminToken = '';
  let userToken = '';
  let createdTaskId = null;

  beforeAll(async () => {
    // Run seed to ensure baseline state
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  // 1. Health check
  it('GET /health - should return service health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // 2. Register user
  it('POST /api/auth/register - should register a new user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'New Tester',
      email: 'newtester@example.com',
      password: 'Password123!'
    });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.role).toBe('user');
    expect(res.body.data).not.toHaveProperty('password');
  });

  // 3. Duplicate registration rejection
  it('POST /api/auth/register - should reject duplicate email', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'New Tester Duplicate',
      email: 'newtester@example.com',
      password: 'Password123!'
    });
    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  // 4. Valid login
  it('POST /api/auth/login - should authenticate valid user credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'user@example.com',
      password: 'UserPass123!'
    });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('token');
    userToken = res.body.data.token;
  });

  it('POST /api/auth/login - should authenticate admin credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'AdminPass123!'
    });
    expect(res.status).toBe(200);
    adminToken = res.body.data.token;
  });

  // 5. Invalid login
  it('POST /api/auth/login - should reject invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'user@example.com',
      password: 'WrongPassword'
    });
    expect(res.status).toBe(401);
  });

  // 6. Missing / Invalid JWT
  it('GET /api/tasks - should reject requests without token', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(401);
  });

  // 7. Regular user creates a task
  it('POST /api/tasks - regular user creates task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'Complete assessment report',
        description: 'Prepare final submission files'
      });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.status).toBe('Pending');
    createdTaskId = res.body.data.id;
  });

  // 8. Regular user lists only own tasks
  it('GET /api/tasks - regular user views own tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  // 9. Regular user cannot update task status (Forbidden)
  it('PATCH /api/tasks/:id/status - regular user forbidden from status update', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${createdTaskId}/status`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ status: 'Completed' });
    expect(res.status).toBe(403);
  });

  // 10. Admin updates status
  it('PATCH /api/tasks/:id/status - admin can update task status', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${createdTaskId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'In Progress' });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('In Progress');
  });

  // 11. Invalid status rejection
  it('PATCH /api/tasks/:id/status - rejects invalid status value', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${createdTaskId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'Archived' });
    expect(res.status).toBe(400);
  });

  // 12. 404 on unknown endpoint
  it('GET /api/unknown - returns 404', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
  });
});
