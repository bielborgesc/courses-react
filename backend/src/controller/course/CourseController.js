const Course = require("../../models/Course")


module.exports = {


    async update(req, res) {
    },

    async remove(req, res) {
    },
    
    async coursesTeacher (req, res) {
     
    },

    async findOneCourseStudent (req, res){
        const {courseId:id} = req.params;
       // const student_id = req.student_id

        const courses = await Course.findByPk(id, {
            
            include : [
                {
                    association :  'teacher',
                    attributes : ['name']
                },
                {
                    association :  'lessons',
                    attributes : ['id', 'title', 'step', 'description', 'url_video'],
                    order : 'step'
                }
            ]
           
        })
        return res.status(200).json(courses);
    },

    async findOne (req, res) {
        const {courseId:id} = req.params;
        
        const courses = await Course.findByPk(id, {
            
            include : [
                {
                    association :  'teacher',
                    attributes : ['name']
                },
                {
                    association :  'lessons',
                    attributes : ['title', 'step', 'description'],
                    order : 'step'
                }
            ]
           
        })
        return res.status(200).json(courses);
    },

    async listAll (req, res) {
        const courses = await Course.findAll({
            include : [
                {
                    association :  'teacher',
                    attributes : ['name']
                }
            ]
           
        })
        return res.status(200).json(courses);
    },
   
    async store(req, res) {

      const teacher_id = req.teacher_id
      const { title, description, image_url, price} = req.body

        const course = await Course.create({
                title, description, image_url, price, teacher_id
            }
        )
       
      return res.status(200).json(course);
       
    }

}