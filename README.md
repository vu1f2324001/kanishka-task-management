
<div align="center">Kanishka Task Management System

Secure REST APIs. Structured Task Management. Role-Based Access.

A Node.js backend project developed for the Kanishka Software Pvt. Ltd. Developer Intern Assessment.

<br>"Node.js" (https://img.shields.io/badge/Node.js-JavaScript-43853D?style=flat-square&logo=node.js&logoColor=white)
"Express" (https://img.shields.io/badge/Express.js-REST_API-303030?style=flat-square&logo=express)
"MySQL" (https://img.shields.io/badge/MySQL-Database-4479A1?style=flat-square&logo=mysql&logoColor=white)
"JWT" (https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens)

</div>---

About the Project

The Kanishka Task Management System is designed to manage tasks through a RESTful API. The project focuses on backend development, user authentication, database relationships, and role-based authorization.

It follows the assessment requirements for two types of users: Admin and Regular User.

«This README describes the intended assessment functionality. Confirm each feature against the actual implementation before submission.»

Features

<table>
<tr>
<td width="50%">Authentication

- User registration
- Email and password login
- JWT-based authentication

</td>
<td width="50%">Task Management

- Create new tasks
- View task lists and individual tasks
- Edit task details

</td>
</tr>
<tr>
<td width="50%">Access Control

- Admin and regular user roles
- Task ownership restrictions
- Protected administrative actions

</td>
<td width="50%">Task Workflow

- Pending
- In Progress
- Testing
- Completed

</td>
</tr>
</table>Technology Stack

Technology| Purpose
Node.js| JavaScript runtime
Express.js| REST API framework
MySQL| Relational database
JWT| Authentication tokens
Knex.js| Query builder and migrations, if used
Postman| API testing, if collection is included

Access Control

Action| Regular User| Admin
Register and log in| Yes| Yes
Create tasks| Yes| Yes
View own tasks| Yes| Yes
View all users' tasks| No| Yes
Edit own tasks| Yes| Yes
Update task status| No| Yes

These permissions reflect the assignment requirements. Test them against the running application before claiming successful enforcement.

Project Structure

The exact directory structure depends on the files in this repository.

A typical structure for this assessment is:

kanishka-task-management/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── app.js
├── migrations/
├── seeds/
├── tests/
├── postman/
├── docs/
├── .env.example
├── .gitignore
├── package.json
└── README.md

Keep this structure section aligned with the actual repository before submitting.

Getting Started

Prerequisites

- Node.js and npm
- MySQL, if configured by the application
- GitHub Codespaces or a local development environment

1. Install Dependencies

npm install

2. Configure Environment Variables

If ".env.example" exists, create your local environment file:

cp .env.example .env

Configure the variables required by the source code, including database connection settings and a private JWT secret.

Never commit ".env", passwords, API keys, or private credentials to GitHub.

3. Configure the Database

Ensure that the configured database is available. Create the database and run the migration and seed commands defined in "package.json".

For example, if these scripts exist:

npm run migrate
npm run seed

4. Start the Application

Use the script configured in "package.json". Common examples are:

npm run dev

or:

npm start

The actual command and port depend on the project configuration.

API Reference

Document and test the actual route paths implemented in the application.

Endpoint purpose| Method| Access
User registration| POST| Public
User login| POST| Public
Current user profile| GET| Authenticated
Create task| POST| Authenticated
List tasks| GET| Authenticated
View a task| GET| Owner / permitted admin
Edit task| PUT| Owner / permitted admin
Update task status| PATCH| Admin only

The table describes the intended API operations. Replace or refine the endpoint paths according to the actual route files.

Authentication Header

For protected endpoints, the expected format is:

Authorization: Bearer <your_jwt_token>

Database Design

The assessment calls for two related entities.

Users

- "id"
- "name"
- "email"
- "password"
- "role"
- "created_at"
- "updated_at"

Tasks

- "id"
- "user_id"
- "title"
- "description"
- "status"
- "created_at"
- "updated_at"

The "user_id" field should reference the user who created the task. Use migrations and seeders as required by the assignment.

API Testing

If a Postman collection is included in the repository:

1. Import the collection into Postman.
2. Configure the application's base URL.
3. Log in and obtain a JWT token.
4. Test task creation, listing, and editing.
5. Verify task ownership restrictions.
6. Confirm that regular users cannot update task status.
7. Verify that authorized admins can update status.

Only report test results after running the tests and confirming their output.

Security Practices

- Hash passwords before storing them.
- Verify JWT signatures and expiration.
- Validate user input and task status values.
- Prevent users from accessing tasks they do not own.
- Restrict administrative operations to authorized roles.
- Use parameterized database queries.
- Keep secrets outside version control.
- Avoid exposing sensitive internal error details.

These are security goals; confirm that each is implemented in the source code.

Screenshots

Screenshots of the actual running application can be added here when available.

Suggested paths:

- "docs/screenshots/auth-portal.png"
- "docs/screenshots/dashboard.png"

Do not add placeholder images or claim that a dashboard exists unless it has been implemented and captured.

Submission Checklist

- [ ] Source code included
- [ ] Database migrations and seeders included
- [ ] ".env.example" included
- [ ] README matches the implementation
- [ ] Postman collection included, if prepared
- [ ] Tests executed and results verified
- [ ] No secrets or ".env" file included in the ZIP
- [ ] Updated resume attached separately

Assessment: Kanishka Software Pvt. Ltd. — Node.js Developer Intern

<div align="center">---

Built as a backend development assessment project.

</div>
EOFecho
echo "README.md created successfully."
echo "Review the README and adjust paths to match the actual project."

if ! command -v zip >/dev/null 2>&1; then
echo "The zip utility is not installed. README and backup are saved, but ZIP was not created."
exit 1
fi

Rebuild the archive from the project while excluding secrets and generated dependencies.

rm -f "$ZIP"
zip -r "$ZIP" . 
-x ".git/" 
"node_modules/" 
".env" 
"/.env" 
"/node_modules/" 
"/.git/" 
"README.backup-.md" 
"$ZIP" 
".codespaces/*"

echo
echo "Checking ZIP integrity..."
unzip -t "$ZIP"
echo
ls -lh README.md "$ZIP"
echo "Done. Review README.md before submitting."
