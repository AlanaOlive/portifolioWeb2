const { DataTypes } = require('sequelize');
const db = require('../confg/db_connection'); 

const Keyword = db.define('Keyword', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  keyword: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'keywords',
  timestamps: false,
});

module.exports = Keyword;
db.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o modelo:', err);
  });
