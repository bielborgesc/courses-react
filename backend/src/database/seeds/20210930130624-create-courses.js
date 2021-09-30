module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'courses', [
        {
          title: 'Curso completo de C',
          description: 'Tudo para você sair manjando da temível linguagem C',
          image_url: 'https://programadoresbrasil.com.br/wp-content/uploads/2020/05/C-programming-1024x530-1.jpg',
          price:  29.9,
          teacher_id:  1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: 'Curso Web Moderno Completo com JavaScript 2021 + Projetos',
          description: 'Domine Web com 15 Cursos + Projetos: Javascript Angular React Next Vue Node HTML CSS jQuery Bootstrap Webpack Gulp MySQL',
          image_url: 'https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2019/12/laptop-2838921_1280.jpg',
          price:  39.9,
          teacher_id:  3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: 'O curso completo de Banco de Dados e SQL, sem mistérios!',
          description: 'Business Intelligence, SQL Server, MySQL, Oracle, T-SQL e PLSQL! Tudo aqui no curso de bancos de dados relacionais!',
          image_url: 'https://static8.depositphotos.com/1057263/814/i/600/depositphotos_8145342-stock-photo-database-table.jpg',
          price:  34.9,
          teacher_id:  1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: 'Java COMPLETO Programação Orientada a Objetos +Projetos',
          description: 'Curso mais didático e completo de Java e OO, UML, JDBC, JavaFX, Spring Boot, JPA, Hibernate, MySQL, MongoDB e muito mais',
          image_url: 'https://marvel-b1-cdn.bc0a.com/f00000000156946/www.jrebel.com/sites/rebel/files/image/2021-03/2021%20java%20technology%20report.jpeg',
          price:  34.9,
          teacher_id:  5,
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