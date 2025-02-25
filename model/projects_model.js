const { DataTypes } = require('sequelize');  
const db = require('../confg/db_connection'); 

const Project = db.define('Project', {
  id: {
    type: DataTypes.INTEGER,    
    primaryKey: true,           
    allowNull: false,          
    autoIncrement: true        
  },
  project_name: {
    type: DataTypes.STRING(50), 
    allowNull: false           
  },
  project_resume: {
    type: DataTypes.STRING(180), 
    allowNull: true             
  },
  project_link: {
    type: DataTypes.STRING,
    allowNull:false
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
  tableName: 'projects',        
  timestamps: false             
});

module.exports = Project;

db.sync()
  .then(() => {
    console.log('Modelo Project sincronizado com o banco de dados!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o modelo:', err);
  });
