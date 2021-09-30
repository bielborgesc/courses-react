'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_courses', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model:'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model:'courses', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_courses');
  }
};
