module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'lessons', [
        {
          title: 'Aula 01 - Algorítimos',
          description: 'Achou que iria sair programando? Sqn... Primeiro você precisa aprender algorítimos',
          step:  1,
          url_video: 'https://www.youtube.com/watch?v=B0yJu5RKQuI',
          course_id:  1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: 'Aula 02 - Equalizando os conhecimento',
          description: 'Nesta aula, iremos equalizar seus conhecimentos para aprender C',
          step:  2,
          url_video: 'https://www.youtube.com/watch?v=qk9dcDh8ZQw',
          course_id:  1,
          created_at: new Date(),
          updated_at: new Date()
        },
        // Curso Web id-2
        {
          title: 'Aula 01 - Manipulação de DOM',
          description: 'Nesta aula, você irá aprender a manipular objetos da DOM com javascript',
          step:  1,
          url_video: 'https://www.youtube.com/watch?v=UftSB4DaRU4',
          course_id:  2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: 'Aula 02 - Responsividade',
          description: 'Nesta aula, iremos ver como fazer nossos layouts serem adaptáveis á qualquer dispositivos',
          step:  2,
          url_video: 'https://www.youtube.com/watch?v=H91DhKPjhPk',
          course_id:  2,
          created_at: new Date(),
          updated_at: new Date()
        },
       
      ]
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};