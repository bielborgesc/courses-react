const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users', [
        {
          name: 'Bleiner Mathias',
          email: 'bleiner.mathias@aluno.ifsp.edu.br',
          password_hash:  await bcrypt.hash('bleiner123', 8),
          is_teacher:  true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Lucas Celestino',
          email: 'celestino.o@aluno.ifsp.edu.br',
          password_hash:  await bcrypt.hash('lucas123', 8),
          is_teacher:  false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Gabriel Carvalho',
          email: 'borges.gabriel@aluno.ifsp.edu.br',
          password_hash:  await bcrypt.hash('gabriel123', 8),
          is_teacher:  true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Letícia Moreno',
          email: 'leticia.moreno@aluno.ifsp.edu.br',
          password_hash:  await bcrypt.hash('leticia123', 8),
          is_teacher:  false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Guilherme Mancuso',
          email: 'guilherme.mancuso@aluno.ifsp.edu.br',
          password_hash:  await bcrypt.hash('guilherme123', 8),
          is_teacher:  true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Ricardo Texeira',
          email: 'r.teixeira@aluno.ifsp.edu.br',
          password_hash:  await bcrypt.hash('ricardo123', 8),
          is_teacher:  false,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};