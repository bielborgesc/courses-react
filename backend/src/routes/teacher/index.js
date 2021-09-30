const express = require("express");
const router = require("express").Router();
const CourseController = require("../../controller/course/CourseController");
const LessonController = require("../../controller/lessons/LessonController");
const authMiddlware = require('../../middlewares/authTeacher');

router.use(authMiddlware);


router.post("/courses/", CourseController.store);
router.get("/courses/", CourseController.coursesTeacher);

router.post("/courses/:course_id/lesson", LessonController.store);

//router.delete("/courses/:courseId", CourseController.remove);
//router.put("/courses/:courseId", CourseController.update);



module.exports = router;