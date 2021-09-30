const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

class User extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING,
            is_teacher: DataTypes.BOOLEAN,
        }, {
            // connection
            sequelize
        });
        
        this.addHook('beforeSave', async user => {
            if(user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
    }      

        static associate(models){
            this.belongsToMany(models.Course, { foreignKey: 'user_id', through: 'user_courses', as: 'courses'});   
        }
}

module.exports = User;