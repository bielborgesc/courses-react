const { findOne, associations } = require("../../models/Course");
const Course = require("../../models/Course");
const Lesson = require("../../models/Lesson");
const CourseController = require("../course/CourseController");

module.exports = {


    async delete (req, res) {
        const teacher_id = req.teacher_id;
        const {course_id, lessonId} = req.params;
        const { title, step, description, url_video} = req.body;
  
        const course = await Course.findByPk(course_id);
        if(!course) {
            res.status(404).json({error: "Course is not founded!"})
        }
        
        if(course.teacher_id !== teacher_id){
            res.status(401).json({error: "Action is not allowed"})
        }
        
        const lesson = await Lesson.findByPk(lessonId);
        
        if(!lesson) {
            res.status(404).json({error: "Lesson is not founded!"})
        }
        
        if(lesson.course_id !== course.id){
            res.status(401).json({error: "Action is not allowed"})
        }

        const lessonDeleted = await lesson.destroy()

        return res.status(200).json(lessonDeleted);
    },

    async update (req, res) {

        const teacher_id = req.teacher_id;
        const {course_id, lessonId} = req.params;
        const { title, step, description, url_video} = req.body;
  
        const course = await Course.findByPk(course_id);
        if(!course) {
            res.status(404).json({error: "Course is not founded!"})
        }
        
        if(course.teacher_id !== teacher_id){
            res.status(401).json({error: "Action is not allowed"})
        }
        
        const lesson = await Lesson.findByPk(lessonId);
        
        if(!lesson) {
            res.status(404).json({error: "Lesson is not founded!"})
        }
        
        if(lesson.course_id !== course.id){
            res.status(401).json({error: "Action is not allowed"})
        }

        const lessonUpdated = await lesson.update({
             title, step, description, url_video
        })

        return res.status(200).json(lessonUpdated);

    },

    async findOne(req, res) {
        const {lesson_id} = req.params;
        const student_id = req.student_id;

       const lesson = await Lesson.findByPk(lesson_id, {
           include : [
               {association : 'course'},
           ]
       })

       if(!lesson){
            return res.status(404).json({message: 'This lesson is not founded!'})
        }
        
        const course = await Course.findByPk(lesson.course_id, {
            
            include : [
                {association: 'users', 
                    attributes: [],
                    where: {id :  student_id},
                },
            ]
           
        });

        if(!course){
            return res.status(401).json({message:'User does not have access to the course!'});
        }
         

        return res.status(200).json(lesson);

    },

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
