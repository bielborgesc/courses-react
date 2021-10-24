const Course = require("../../models/Course");
const User = require("../../models/User");


module.exports = {


    async update(req, res) {
        const {courseId} = req.params;        
        const teacher_id = req.teacher_id
     
        const { title, description, image_url, price} = req.body

        const course = await Course.findByPk(courseId);

        if(!course) {
            res.status(404).json({message : 'Course not founded!'})
        }
        
        if(course.teacher_id !== teacher_id){
            res.status(401).json({message : 'Access Denied!'})
        }
        
        const courseUpdated = await course.update({
                title, description, image_url, price
            }
        ) 
    
        return res.status(200).json(courseUpdated);
    },

    async remove(req, res) {
        const {courseId} = req.params;        
        const teacher_id = req.teacher_id
     
        const { title, description, image_url, price} = req.body

        const course = await Course.findByPk(courseId);

        if(!course) {
            res.status(404).json({message : 'Course not founded!'})
        }
        
        if(course.teacher_id !== teacher_id){
            res.status(401).json({message : 'Access Denied!'})
        }
        
        const courseDeleted = await course.destroy() 
    
        return res.status(200).json(courseDeleted);
    },
    
    async coursesTeacher (req, res) {
        const teacher_id = req.teacher_id
        console.log(teacher_id);
        const courses = await Course.findAll({
            where : {teacher_id},
            include: [ 
                {
                    association :  'lessons',
                    attributes : ['id', 'title', 'step', 'description', 'url_video'],
                    order : 'step'
                } 
            ]  
        })
        return res.status(200).json(courses);
    },

    async findCoursesStudent (req, res) {
        const student_id = req.student_id
        
        const courses = await Course.findAll({
            include: [
             
                {association: 'users', 
                    // Get only name type
                    attributes: ['id'],
                    where: {id :  student_id},
                    // Dont gets data attributes from pivot table (recipe_types)
                    through: {
                        attributes : []
                    }

                }
            ]
        })

        if(courses < 1) {
            return res.status(200).json({message: "User doesn't have any course!"});
        }

        return res.status(200).json(courses);
        
    },

    async findOneCourseStudent (req, res){
        
        const {course_id:id} = req.params;
        const student_id = req.student_id

        const course = await Course.findByPk(id, {
            
            include : [
                {association: 'users', 
                    attributes: [],
                    where: {id :  student_id},
                },
                {
                    association :  'teacher',
                    attributes : ['id','name']
                },
                {
                    association :  'lessons',
                    attributes : ['id', 'title', 'step', 'description', 'url_video'],
                    order : 'step'
                }
            ]
           
        })

        if(!course){
            return res.status(401).json({message:'User does not have access to the course!'});
        }

        return res.status(200).json(course);
    },

    async findOne (req, res) {
        const {courseId:id} = req.params;
        
        const course = await Course.findByPk(id, {
            
            include : [
                {
                    association :  'teacher',
                    attributes : ['id','name']
                },
                {
                    association :  'lessons',
                    attributes : ['id','title', 'step', 'description'],
                    order : 'step'
                }
            ]
           
        });
        
        if(!course){
            return res.status(404).json({message:'Course is not founded!'});
        }

        return res.status(200).json(course);
    },

    async findOneCourseTeacher (req, res) {
        const {courseId:id} = req.params;
        
        const course = await Course.findByPk(id, {
            
            include : [
                {
                    association :  'teacher',
                    attributes : ['id','name']
                },
                {
                    association :  'lessons',
                    attributes : ['id','title', 'step', 'description', 'url_video'],
                    order : 'step'
                }
            ]
           
        });
        
        if(!course){
            return res.status(404).json({message:'Course is not founded!'});
        }

        return res.status(200).json(course);
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