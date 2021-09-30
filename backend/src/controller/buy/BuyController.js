const Course = require("../../models/Course");
const User = require("../../models/User");

module.exports = {

    async buy (req, res) {

        const student_id = req.student_id;
        const {course_id} = req.params;

        const courseBuy = Course.findByPk(course_id);

        if(!courseBuy){
            return res.status(405).json({error: 'Course is not exists!'})
        }

        const user = User.findByPk(student_id);

        if(!user){
            return res.status(405).json({error: 'User problem'})
        }

       await user.addCourse(user);

        return res.status(200).json(courseBuy);
    }

}