const { DataTypes } = require('sequelize');
const db = require('../confg/db_connection'); 

const UserKnowledge = db.define('UserKnowledge', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  id_user: {
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
  tableName: 'users_knowledges',
  timestamps: false
});

module.exports = UserKnowledge;

db.sync()
  .then(() => {
    console.log('Modelo UserKnowledge sincronizado com o banco de dados!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o modelo:', err);
  });
