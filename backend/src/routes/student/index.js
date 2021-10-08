const express = require("express");
const BuyController = require("../../controller/buy/BuyController");
const CourseController = require("../../controller/course/CourseController");
const LessonController = require("../../controller/lessons/LessonController");
const router = require("express").Router();

const authMiddlware = require('../../middlewares/authStudent')

router.use(authMiddlware);

router.get("/courses/", CourseController.findCoursesStudent);

router.get("/courses/:course_id", CourseController.findOneCourseStudent)
router.get("/courses/play/:lesson_id", LessonController.findOne)
router.get("/courses/buy/:course_id", BuyController.buy)

module.exports = router;