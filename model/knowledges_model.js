const { DataTypes } = require('sequelize');
const db = require('../config/db_connection');

const Knowledge = db.define('Knowledge', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING(50),
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
  tableName: 'knowledges',
  timestamps: false
});

module.exports = Knowledge;

db.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o modelo:', err);
  });
