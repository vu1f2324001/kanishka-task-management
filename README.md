# Kanishka Task Management REST API

> Backend Developer Intern Assessment submission for Kanishka Software Pvt. Ltd.

A secure, scalable REST API built with **Node.js**, **Express.js**, **MySQL**, and **JWT authentication**, featuring role-based access control (RBAC), parameterized queries via Knex.js, and automated schema migrations.

---

## 🛠 Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MySQL 8.0
- **Query Builder & Migrations:** Knex.js (`mysql2` driver)
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) & `bcrypt` password hashing
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate Limiting (`express-rate-limit`)
- **Testing:** Jest & Supertest

---

## 📁 Architecture & Directory Structure

```text
kanishka-task-management/
├── src/
│   ├── app.js               # Express application configuration
│   ├── server.js            # Database verification & HTTP server entry
│   ├── config/              # Knex database connection instance
│   ├── controllers/         # HTTP request/response handlers
│   ├── services/            # Business logic and database operations
│   ├── routes/              # Express API route declarations
│   ├── middleware/          # JWT auth, RBAC authorization, error handling
│   ├── validators/          # Zod input schemas
│   └── utils/               # Standardized API response & JWT helpers
├── migrations/              # Database schema migrations
├── seeds/                   # Seeders for default users
├── tests/                   # Automated integration tests
├── postman/                 # Postman collection with test assertions
├── .env.example             # Documented environment template
├── knexfile.js              # Knex configuration for dev/test
└── package.json
,

