const { Model, DataTypes } = require("sequelize");


class Lesson extends Model {
    static init(sequelize){
        super.init({
            title: DataTypes.STRING,
            step: DataTypes.INTEGER,
            description: DataTypes.STRING,
            url_video: DataTypes.STRING,
           }, {
            // connection
            sequelize
        });        
    }
    
    static associate(models) {
        this.belongsTo(models.Course, {foreignKey: 'course_id', as: 'course'});
    }
}

module.exports = Lesson;