<div align="center">

# 📋 Kanishka Task Management System
### Secure REST APIs • Relational Architecture • Role-Based Access Control

[![Node.js](https://img.shields.io/badge/Node.js-v18+-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-REST_API-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Knex.js](https://img.shields.io/badge/Knex.js-Migrations_%26_Seeds-D2691E?style=for-the-badge&logo=knex.js&logoColor=white)](https://knexjs.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Jest Tests](https://img.shields.io/badge/Jest-13%2F13_Passed-brightgreen?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

Developed for the **Node.js Developer Intern Technical Assessment** at **Kanishka Software Pvt. Ltd.**

</div>

---

## 📌 Features Overview
* **Authentication & Authorization:** Bcrypt password hashing, stateless 24-hour JWT tokens, and rate-limited logins.
* **Granular RBAC:** Users access only their own tasks; Administrators can view all tasks and update status transitions.
* **Database & Relational Model:** MySQL 8.0 with Knex.js migrations, foreign key constraints (`ON DELETE CASCADE`), and idempotent seeders.
* **Input Validation & Security:** Strict Zod schema validation, Helmet HTTP headers, CORS origin control, and IDOR prevention.
* **Interactive Evaluation Console:** Modern UI served via `/public` for instant verification in browser.
* **100% Automated Test Coverage:** 13 out of 13 integration tests passing.

---

## 🛠 Technology Stack
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js (v18+) | Non-blocking asynchronous backend |
| **Framework** | Express.js | Route routing & security middleware |
| **Database** | MySQL 8.0 | Relational ACID persistence |
| **Query Engine** | Knex.js (`mysql2`) | Migrations, seeders, and safe parameterized queries |
| **Auth & Security** | JWT, Bcrypt, Helmet | Token issuance, salted hashing, and header protection |
| **Validation** | Zod | Runtime payload contract enforcement |
| **Testing** | Jest & Supertest | Automated API integration tests |

---

## 🏛️ Project Directory Structure
```text
kanishka-task-management/
├── src/
│   ├── app.js               # Express application initialization & routes mounting
│   ├── server.js            # Database health check & server bootstrap
│   ├── config/              # Knex MySQL connection pooling
│   ├── controllers/         # HTTP request/response handlers
│   ├── services/            # Pure business logic and database queries
│   ├── routes/              # Express API route declarations
│   ├── middleware/          # JWT auth, RBAC admin guards, error sanitization
│   ├── validators/          # Zod request validation schemas
│   └── utils/               # Standardized JSON response & JWT utilities
├── migrations/              # Relational Knex migrations for users and tasks
├── seeds/                   # Repeatable seed data (Admin and Regular user)
├── tests/
│   └── api.test.js          # Complete 13-test integration suite
├── postman/
│   └── task-management.postman_collection.json # Automated Postman collection
├── public/
│   └── index.html           # Live evaluation dashboard UI
├── docs/screenshots/       # Application portal captures
├── .env.example             # Clean environment template
└── package.json
