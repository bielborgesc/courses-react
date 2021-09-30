#Backend

To configure the backend on your machine:

### Install project dependencies:

- npm install

### Settings:

Configure your database

- /src/config/database.js

### Database

- [1] npx sequelize db:create
- [2] npx sequelize bd:migrate

### Run project:

- npm start

## Routes

:bulb: In this directory has a [Insomnia.json] file. Import it into your Insominia to test routes

### Routes - Auth

    - Register
      /auth/register

    - Login
      /auth/login

### Routes - Teacher

:warning: headers -> Authorization [token]

    - Create Course
        [post] /me/teacher/courses/

    - Create Lesson
        [post] /me/teacher/courses/:course_id/lesson

### Routes main

    - List all courses
      /courses

    - Find One Course
      /courses/:course_id
