const { DataTypes } = require('sequelize');
const db = require('../confg/db_connection'); 

const AuthorProject = db.define('AuthorProject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  id_author: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_project: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'authors_projects',
  timestamps: false
});

module.exports = AuthorProject;

db.sync()
  .then(() => {
    console.log('Modelo AuthorProject sincronizado com o banco de dados!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o modelo:', err);
  });
