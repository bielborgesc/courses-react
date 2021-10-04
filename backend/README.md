# Backend

To configure the backend on your machine:

### Install project dependencies:

- npm install

### Settings:

Configure your database

- /src/config/database.js

### Database

- [1] npx sequelize db:create
- [2] npx sequelize db:migrate
- [3] npx sequelize db:seed:all

### Run project:

- npm start

## Routes

:bulb: In this directory has a [Insomnia.json] file. Import it into your Insominia to test routes

### Routes - Auth

    - Register
        [POST] /auth/register

    - Login
        [POST] /auth/login

### Routes - Teacher

:warning: headers -> Authorization [token]

    - Create Course
        [POST] /me/teacher/courses/

    - Create Lesson
        [POST] /me/teacher/courses/:course_id/lesson

    - List Courses
        [GET] /me/teacher/courses/

### Routes - Student

:warning: headers -> Authorization [token]

    - List courses
        [GET] /me/student/courses/

    - Buy course
        [GET] /me/student/courses/buy/:course_id

    - Find one course
      * Accessing with the token, listing a course, the route shows the url of the videos of each lesson
        [GET] /me/student/courses/:course_id

    - Access lesson
        [GET] /me//student/courses/play/:lesson_id

### Routes main

    - List all courses
        [GET]  /courses

    - Find One Course
        [GET]  /courses/:course_id
