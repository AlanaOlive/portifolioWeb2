const {Sequelize, DataTypes} = require('sequelize');

// Dados da conexão
const sequelize = new Sequelize('portifolio_web2', 'alana', 'alana', {
  host: 'localhost',          
  dialect: 'mysql', 
  port:3307,          
  logging: false,             
});

module.exports = sequelize;

// Testando a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  })