const { DataTypes } = require('sequelize');  
const db = require('../confg/db_connection'); 
const AuthorProject = require('./authors_projects_model'); 

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
    password: {
      type: DataTypes.STRING(30), 
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

User.hasMany(AuthorProject, {
    foreignKey: 'id_author',  
    sourceKey: 'id',
  });

AuthorProject.belongsTo(User, {
  foreignKey: 'id_author', 
  targetKey: 'id', 
});

module.exports = User;

db.sync()
.then(() => {
  console.log('Modelo User sincronizado com o banco de dados!');
})
.catch(err => {
  console.error('Erro ao sincronizar o modelo:', err);
});
