const express = require("express");
const router = require("express").Router();
const CourseController = require("../../controller/course/CourseController");
const LessonController = require("../../controller/lessons/LessonController");
const UserController = require("../../controller/user/UserController");
const authMiddlware = require('../../middlewares/authTeacher');

router.use(authMiddlware);

router.get("/", (req, res) => {
    res.status(200).json({isTeacher : 'true'});
});

router.post("/courses/", CourseController.store);
router.get("/courses/", CourseController.coursesTeacher);

router.post("/courses/:course_id/lesson", LessonController.store);
router.put("/courses/:course_id/lesson/:lessonId", LessonController.update);

router.delete("/courses/:course_id/lesson/:lessonId", LessonController.delete);

router.get("/courses/:courseId", CourseController.findOneCourseTeacher);
router.delete("/courses/:courseId", CourseController.remove);
router.put("/courses/:courseId", CourseController.update);



module.exports = router;