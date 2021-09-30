'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('course_types', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model:'courses', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model:'types', key: 'id'},
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
    return queryInterface.dropTable('course_types');
  }
};
