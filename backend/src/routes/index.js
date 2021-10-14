const express = require('express');
const CourseController = require('../controller/course/CourseController');
const LoginController = require('../controller/user/LoginController');
const UserController = require("../controller/user/UserController");

const router = require("express").Router();

router.use("/me/teacher", require("./teacher"));
router.use("/me/student", require("./student"));

router.get("/me", function (req,res) {
    res.json({message: "Faça login!"});
})

router.post("/auth/register", UserController.register)
router.post("/auth/login", UserController.login)
router.get("/auth/validate", UserController.isTeacher);

//router.get("/admin/users", UserController.listAll)

router.get("/courses", CourseController.listAll);
router.get("/courses/:courseId", CourseController.findOne);



module.exports = router;