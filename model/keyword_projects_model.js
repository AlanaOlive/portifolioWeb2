const { DataTypes } = require('sequelize');
const db = require('../config/db_connection');

const KeywordProject = db.define('KeywordProject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  id_project: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  keyword: {
    type: DataTypes.STRING(20),
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
  tableName: 'keyword_projects',
  timestamps: false
});

module.exports = KeywordProject;

db.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o modelo:', err);
  });
