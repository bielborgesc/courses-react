const express = require("express");
const BuyController = require("../../controller/buy/BuyController");
const CourseController = require("../../controller/course/CourseController");
const router = require("express").Router();

const authMiddlware = require('../../middlewares/authStudent')

router.use(authMiddlware);

router.get("/courses/", CourseController.findCoursesStudent);

router.get("/courses/:course_id", CourseController.findOneCourseStudent)
router.get("/courses/:course_id/buy", BuyController.buy)

module.exports = router;