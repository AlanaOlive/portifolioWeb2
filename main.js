const express = require('express');
const app = express();
const path = require('path');
const Project  = require('./controllers/scripts/CRUD_project');
const project_object = new Project();
const methodOverride = require('method-override');
const routes = require('./controllers/routes/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '\\view\\html');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true })); 
app.use(routes);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'controllers/')));
app.use(express.static(path.join(__dirname, 'view/')));
app.use(express.json());

app.get('/', (req, res) => {
    project_object.getAllProjects(req, res);
});
   
module.exports = app;
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
