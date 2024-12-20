const { DataTypes } = require('sequelize');  
const db = require('../confg/db_connection'); 

const User = db.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  
      allowNull: false,  
      autoIncrement: true 
    },
    user_name: {
      type: DataTypes.STRING(50), 
      allowNull: false 
    },
    adm_roles: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,         
      defaultValue: false       
    }
  }, {
    tableName: 'users', 
    timestamps: false    
  });

module.exports = User;

db.sync()
.then(() => {
  console.log('Modelo sincronizado com o banco de dados!');
})
.catch(err => {
  console.error('Erro ao sincronizar o modelo:', err);
});

