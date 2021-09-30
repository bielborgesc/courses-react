const { Model, DataTypes } = require("sequelize");


class Course extends Model {
    static init(sequelize){
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            image_url: DataTypes.STRING,
            price: DataTypes.FLOAT,
           }, {
            // connection
            sequelize,
        }); 
          
    }
    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'teacher_id', as: 'teacher'});
        this.hasMany(models.Lesson, {foreignKey : 'course_id', as : 'lessons'});
        this.belongsToMany(models.User, { foreignKey : 'course_id', through: 'user_courses', as: 'users'});   

    }
}

module.exports = Course;