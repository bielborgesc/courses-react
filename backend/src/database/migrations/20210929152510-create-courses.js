'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.createTable('courses', {
     
     id : {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },

     title: {
       type: Sequelize.STRING,
       allowNull: false,
     },

     description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },

    teacher_id: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      refereces: { model: 'users', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT', // User is not delete account if have recipes
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
    return queryInterface.dropTable('courses');
  }
};
