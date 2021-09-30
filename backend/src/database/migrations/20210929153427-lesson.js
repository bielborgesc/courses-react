'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('lessons', {
     
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      course_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model:'courses', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      step: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      url_video: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('lessons');
  }
};
