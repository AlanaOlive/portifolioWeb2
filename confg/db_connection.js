const {Sequelize, DataTypes} = require('sequelize');

// Dados da conexão
const sequelize = new Sequelize('portifolioweb2', 'root', 'sua_senha', {
  host: 'localhost',          
  dialect: 'mysql',           
  logging: false,             
});

// Testando a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });
