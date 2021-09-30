const Course = require("../../models/Course");
const Lesson = require("../../models/Lesson");

module.exports = {

    async store (req, res) {            

        const teacher_id = req.teacher_id;
        const { title, step, description, url_video} = req.body;
        const {course_id} = req.params;
  
        const course = await Course.findByPk(course_id);
        if(!course) {
            res.status(404).json({error: "Course is not founded!"})
        }

        if(course.teacher_id !== teacher_id){
            res.status(401).json({error: "Action is not allowed"})
        }

        const lesson = await Lesson.create({
            title, step, description, url_video, course_id
        })

        return res.status(200).json(lesson);
    }
}
