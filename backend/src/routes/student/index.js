const express = require("express");
const BuyController = require("../../controller/buy/BuyController");
const CourseController = require("../../controller/course/CourseController");
const router = require("express").Router();

const authMiddlware = require('../../middlewares/authStudent')

router.use(authMiddlware);

router.get("/", function (req,res) {
    res.json({message: "Meus cursos"});
})

router.get("/courses/:courseId", CourseController.findOneCourseStudent)
router.get("/courses/:courseId/buy", BuyController.buy)

module.exports = router;