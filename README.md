
Kanishka Task Management System

Node.js Developer Intern Assessment — Kanishka Software Pvt. Ltd.

A secure RESTful Task Management API built with Node.js, Express.js, MySQL, Knex.js, and JSON Web Token (JWT) authentication.

The application allows registered users to create, view, and edit their own tasks. Administrator accounts have additional permissions to view all tasks and update task statuses.

---

Table of Contents

1. Project Overview
2. Features
3. Technology Stack
4. Project Architecture
5. Prerequisites
6. GitHub Codespaces Setup
7. Environment Configuration
8. Database Setup
9. Running the Application
10. API Documentation
11. Authentication and Authorization
12. Database Schema
13. Test Credentials
14. Postman API Testing
15. Automated Testing
16. Security Practices
17. Screenshots
18. Troubleshooting
19. Submission Instructions
20. Assignment Information

---

1. Project Overview

The Task Management System provides a REST API for managing tasks with authentication and role-based access control.

The primary objectives are:

- Build RESTful APIs using Node.js and Express.js.
- Implement secure authentication using JWT.
- Store user and task information in MySQL.
- Enforce authorization based on user roles and task ownership.
- Implement database migrations and seeders.
- Validate requests and handle errors consistently.
- Provide an importable Postman collection for API verification.
- Document the setup and usage of the application.

This repository is designed for the Kanishka Software Pvt. Ltd. Node.js Developer Intern assessment.

2. Features

Authentication

- User registration.
- User login with email and password.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected API endpoints.
- Authenticated user profile endpoint.

Task Management

- Create a task.
- List accessible tasks.
- Retrieve a task by ID.
- Edit task title and description.
- Update task status through a dedicated endpoint.

Role-Based Access Control

- Regular users can manage their own tasks.
- Administrators can view and edit all tasks.
- Only administrators can update task statuses.
- Public registration cannot grant administrator privileges.
- Unauthorized access to another user's task is denied.

Developer Experience

- MySQL relational database.
- Knex.js migrations and seeders.
- Environment-based configuration.
- Centralized error handling.
- Input validation.
- Postman API collection.
- Automated tests where implemented.

---

3. Technology Stack

Technology| Purpose
Node.js| JavaScript runtime
Express.js| REST API framework
MySQL| Relational database
Knex.js| Query builder, migrations and seeders
JSON Web Token| Authentication
bcrypt| Password hashing
Zod or express-validator| Input validation, depending on implementation
Helmet| HTTP security headers, if configured
express-rate-limit| Request rate limiting, if configured
Jest and Supertest| Automated testing, if configured
Postman| API testing

The technologies and features listed above should match the dependencies and implementation actually present in the repository.

---

4. Project Architecture

The intended directory structure is:

kanishka-task-management/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── task.service.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   ├── validate.js
│   │   ├── error-handler.js
│   │   └── not-found.js
│   ├── validators/
│   └── utils/
├── migrations/
├── seeds/
├── tests/
├── postman/
│   └── task-management.postman_collection.json
├── public/
├── docs/
│   └── screenshots/
├── .env.example
├── .gitignore
├── knexfile.js
├── package.json
├── package-lock.json
└── README.md

Some directories may differ depending on the actual implementation. Only files that exist in the repository should be considered implemented.

Architectural Responsibilities

Routes: Define API endpoints and attach middleware.

Controllers: Handle HTTP requests, responses, and status codes.

Services: Contain business logic and database operations, if this layer is implemented.

Middleware: Authenticate requests, enforce permissions, validate inputs, and handle errors.

Migrations: Create and update the database schema.

Seeders: Insert repeatable development test data.

Tests: Verify API behavior and authorization rules.

---

5. Prerequisites

Install or configure the following:

- Node.js 18 or a compatible supported version.
- npm.
- Git.
- MySQL 8 or a compatible MySQL service.
- GitHub account with access to Codespaces.
- Postman or another HTTP API client.

Verify Node.js and npm:

node --version
npm --version

Check Git:

git --version

A GitHub Codespace provides a browser-based development environment, but it does not guarantee that a MySQL server is already running.

---

6. GitHub Codespaces Setup

Step 1: Open the Repository

Open the project repository on GitHub and create or open a Codespace.

Step 2: Open the Terminal

In the Codespaces editor, open:

Terminal → New Terminal

Step 3: Verify the Project Directory

pwd
ls -la

Confirm that "package.json" and the application source files are present.

Step 4: Install Dependencies

npm install

If the repository contains a valid "package-lock.json", a clean installation can also be performed with:

npm ci

Use "npm ci" when the lockfile matches "package.json".

Step 5: Configure Environment Variables

Create a local environment file from the example:

cp .env.example .env

Edit ".env" using the Codespaces editor and supply the correct database configuration and a strong development JWT secret.

Never commit ".env" to Git.

---

7. Environment Configuration

Create an ".env.example" file containing placeholders such as:

NODE_ENV=development
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=kanishka_tasks
DB_USER=your_database_user
DB_PASSWORD=your_database_password

JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=24h

BCRYPT_SALT_ROUNDS=10
CORS_ORIGIN=http://localhost:3000

Adjust these variables to match the application's actual configuration.

Important

- ".env.example" must contain placeholders, not actual secrets.
- ".env" contains local configuration and must remain untracked.
- Never publish database passwords or JWT secrets.
- Do not use a publicly known example secret in a deployed environment.
- Configure remote service credentials using protected environment settings or Codespaces Secrets when appropriate.

---

8. Database Setup

Step 1: Start or Configure MySQL

Ensure a MySQL service is available and reachable from the Codespace.

For a local MySQL server, configure its host, port, database name, username, and password in ".env".

If MySQL is not available inside Codespaces, use a compatible database service or a MySQL container if the environment supports Docker.

Step 2: Create the Database

Create the database through MySQL Workbench, a MySQL client, or your database provider:

CREATE DATABASE kanishka_tasks;

This is an illustrative setup command. The project submission should use migrations and seeders rather than a separate SQL file.

Step 3: Run Migrations

If the project defines the following script:

npm run migrate

This should create the required tables and constraints.

Step 4: Run Seeders

If the project defines the following script:

npm run seed

This should create the development administrator and regular user accounts.

Verify that both commands exist in "package.json" before using them.

---

9. Running the Application

Start the development server:

npm run dev

If the project uses a production start script:

npm start

The server port is controlled by the "PORT" environment variable.

If the application uses port "3000", the base URL is:

http://localhost:3000

In GitHub Codespaces, use the Ports panel to open the forwarded application port.

A health endpoint may be available at:

GET /health

Verify the actual route in the source code before relying on it.

---

10. API Documentation

All protected endpoints require a valid JWT unless stated otherwise.

Authentication Endpoints

Method| Endpoint| Description| Authentication
POST| "/api/auth/register"| Register a new user| Not required
POST| "/api/auth/login"| Authenticate and obtain a JWT| Not required
GET| "/api/auth/me"| Retrieve the current user's profile| Required

Task Endpoints

Method| Endpoint| Description| Authentication
POST| "/api/tasks"| Create a task| Required
GET| "/api/tasks"| List permitted tasks| Required
GET| "/api/tasks/:id"| Retrieve a task| Required
PUT| "/api/tasks/:id"| Edit task details| Required
PATCH| "/api/tasks/:id/status"| Update task status| Admin only

These paths represent the intended API contract. Confirm that the application actually registers each route.

Register a User

Request:

POST /api/auth/register
Content-Type: application/json

{
  "name": "Regular User",
  "email": "user@example.com",
  "password": "UserPass123!"
}

Expected behavior:

- Validate the input.
- Reject duplicate email addresses.
- Hash the password.
- Assign the regular "user" role.
- Return safe user information without a password hash.

Login

Request:

POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "UserPass123!"
}

A successful login should return a JWT token and safe user information.

Example response structure:

{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<JWT_TOKEN>",
    "user": {
      "id": 2,
      "name": "Regular User",
      "email": "user@example.com",
      "role": "user"
    }
  }
}

The exact response format depends on the implementation.

Create a Task

Request:

POST /api/tasks
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Complete internship assignment",
  "description": "Implement and test the required REST APIs"
}

The server must derive task ownership from the authenticated user's identity, not from an untrusted "user_id" supplied by the client.

List Tasks

Request:

GET /api/tasks
Authorization: Bearer <JWT_TOKEN>

Expected behavior:

- Regular users receive only their own tasks.
- Administrators may receive all tasks.

Retrieve a Task

Request:

GET /api/tasks/1
Authorization: Bearer <JWT_TOKEN>

A user must not access another user's task unless the administrator policy explicitly allows it.

Update Task Details

Request:

PUT /api/tasks/1
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Updated assignment",
  "description": "Complete the API documentation and testing"
}

Regular users may edit their own tasks. Administrators may edit any task.

Regular users must not change task status through this endpoint.

Update Task Status

Request:

PATCH /api/tasks/1/status
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "status": "In Progress"
}

Supported statuses:

- "Pending"
- "In Progress"
- "Testing"
- "Completed"

Only an authenticated administrator may use this endpoint.

---

11. Authentication and Authorization

JWT Authentication

After successful login, the client receives a signed token.

Send it in protected API requests using:

Authorization: Bearer <JWT_TOKEN>

The server should verify the token signature and expiration before accepting the request.

Permission Matrix

Operation| Regular User| Administrator
Register| Yes| Admin role is not publicly assignable
Login| Yes| Yes
View own tasks| Yes| Yes
View all tasks| No| Yes
Create task| Yes| Yes
Edit own task| Yes| Yes
Edit another user's task| No| Yes
Change task status| No| Yes

Important Authorization Rules

- Derive identity from the verified JWT.
- Enforce task ownership in database queries or authorization checks.
- Do not trust user-supplied roles.
- Do not allow public registration to assign administrator privileges.
- Reject status updates from regular users.
- Use consistent and appropriate "401", "403", and "404" responses.

---

12. Database Schema

Users

Column| Purpose
"id"| Primary key
"name"| User's name
"email"| Unique email address
"password"| Bcrypt password hash
"role"| "user" or "admin"
"created_at"| Creation timestamp
"updated_at"| Last update timestamp

Tasks

Column| Purpose
"id"| Primary key
"user_id"| Foreign key referencing the task owner
"title"| Task title
"description"| Optional task description
"status"| Current task status
"created_at"| Creation timestamp
"updated_at"| Last update timestamp

Relationship

One user can own multiple tasks.

The "tasks.user_id" column references "users.id". Database migrations should define the foreign key and suitable constraints.

---

13. Development Test Credentials

The following credentials are examples for local development only. They work only if the corresponding seeder creates these accounts with matching hashed passwords.

Role| Email| Example Password
Administrator| "admin@example.com"| "AdminPass123!"
Regular User| "user@example.com"| "UserPass123!"

Never use these sample passwords in production.

If the seeders use different credentials, update this section to match the actual development configuration.

---

14. Postman API Testing

If available, the collection should be located at:

postman/task-management.postman_collection.json

Import Instructions

1. Open Postman.
2. Select Import.
3. Choose the collection JSON file.
4. Configure the base URL.
5. Log in as a regular user.
6. Save the returned JWT in the user token variable if required.
7. Log in as the administrator.
8. Save the returned JWT in the admin token variable if required.
9. Execute the task endpoints.
10. Verify successful and forbidden operations.

Essential Test Scenarios

- Registration with valid input.
- Duplicate email registration.
- Login with correct credentials.
- Login with incorrect credentials.
- Request without a JWT.
- Regular user creating a task.
- Regular user accessing their own task.
- Regular user attempting to access another user's task.
- Regular user attempting to change task status.
- Administrator changing task status.
- Invalid status submission.
- Invalid task ID.
- Unknown API endpoint.

Do not claim that a Postman request passed until it has actually been executed.

---

15. Automated Testing

If automated tests are configured, run:

npm test

Check the exit code and complete test output.

Testing should cover authentication, task creation, ownership checks, administrator permissions, validation, and error handling.

Document the actual test results here after execution.

Test results: Not asserted by this README. Run the test suite and record the verified outcome.

---

16. Security Practices

The implementation should follow these practices:

- Hash passwords with bcrypt.
- Never return password hashes in API responses.
- Verify JWT signatures and expiration.
- Keep JWT secrets outside source control.
- Validate incoming request data.
- Use parameterized database queries or a safe query builder.
- Enforce role-based permissions on the server.
- Prevent cross-user task access.
- Prevent privilege escalation during registration and task updates.
- Configure appropriate security headers.
- Apply reasonable login rate limits where implemented.
- Handle errors without exposing sensitive production details.
- Exclude ".env", dependency folders, and generated secrets from the submission.

Security features should only be described as implemented after verifying the relevant source code and configuration.

---

17. Screenshots

Screenshots may be added to "docs/screenshots/" to demonstrate the actual application interface.

Suggested files:

- "docs/screenshots/auth-portal.png"
- "docs/screenshots/dashboard.png"

Authentication Screen

If captured, this screenshot can demonstrate the login interface and authentication flow.

Task Dashboard

If captured, this screenshot can demonstrate task listing, task creation, role indicators, and status controls supported by the actual application.

To display real screenshots in GitHub Markdown, use:

![Authentication Screen](docs/screenshots/auth-portal.png)

![Task Management Dashboard](docs/screenshots/dashboard.png)

These images must be captured from the working application and saved at the stated paths. Creating the folder alone does not create screenshots.

If the project is API-only and has no frontend, remove the dashboard claims and document API testing screenshots instead.

---

18. Troubleshooting

Database Connection Error

- Confirm the MySQL server is running.
- Verify host and port.
- Verify the database exists.
- Check the username and password.
- Confirm the Codespace can reach the database host.

Missing Environment Variables

- Confirm ".env" exists locally.
- Compare its variable names with ".env.example".
- Restart the application after configuration changes.

JWT Authentication Error

- Log in again to obtain a valid token.
- Check the "Authorization" header.
- Use the "Bearer" prefix.
- Confirm the JWT secret is consistent between token signing and verification.
- Check whether the token has expired.

Migration or Seeder Error

- Check the database connection.
- Verify migration and seeder filenames.
- Confirm the package scripts exist.
- Read the full terminal error before retrying.

Port or Application Error

- Confirm the server started successfully.
- Check whether the configured port is already in use.
- Open the forwarded port through the Codespaces Ports panel.

---

19. Submission Instructions

The final ZIP should contain the complete project source code and required assignment files.

Required items:

- Source code.
- Database migrations/schema.
- Seeders.
- "README.md".
- ".env.example".
- Postman collection.
- Tests, if implemented.
- Relevant project configuration.

Exclude:

- Actual ".env" files.
- Passwords and private keys.
- API secrets.
- "node_modules/".
- ".git/" history unless specifically requested.

Verify Required Files

Run:

ls -la
find src migrations seeds postman tests -maxdepth 3 -type f 2>/dev/null

Review the output and confirm that required files actually exist.

Create the Submission ZIP

After completing and verifying the project, run:

zip -r kanishka-task-management.zip . \
  -x "node_modules/*" \
     ".git/*" \
     ".env" \
     "kanishka-task-management.zip"

Verify the archive:

ls -lh kanishka-task-management.zip
unzip -l kanishka-task-management.zip

Ensure that the ZIP includes all required source and documentation files and contains no secrets.

Download the ZIP through the Codespaces Explorer or the available file-download workflow.

---

20. Assignment Information

Organization: Kanishka Software Pvt. Ltd.

Role: Node.js Developer Intern

Assignment: Task Management System REST API

Primary focus:

- Backend development.
- REST API design.
- JWT authentication.
- Database integration.
- Role-based authorization.
- API testing.
- Code quality and documentation.

Submission email: hr@ksoftpl.com

Attach the completed project ZIP and updated resume to the submission email. Follow the instructions supplied by the placement or HR team and complete any required submission form.

---

Project Status

This README documents the intended application design and setup workflow. It does not independently certify that the application starts, that all features are implemented, or that tests pass.

Verify the implementation, run the required commands, and update the documentation to reflect the actual final project before submission.

---

<div align="center">Kanishka Task Management System

Built as a Node.js Developer Intern assessment project.

</div>
EOFecho "README.md created."
