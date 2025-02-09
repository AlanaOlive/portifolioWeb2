const express = require('express');
const app = express();
const path = require('path');
const Project  = require('./controllers/scripts/add_project');
const project_object = new Project();

app.set('view engine', 'ejs');
app.set('views', __dirname + '\\view\\html');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'controllers')));
app.use(express.json());

app.get('/', (req, res) => {
    project_object.getAllProjects(req, res);
});

app.route('/cadastroProjetos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/cadastroProjetos.html'));
    })
    .post(async (req,res)=>{
        project_object.addProject(req, res); 
    });
    

app.route('/meusProjetos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/meusProjetos.html'));
    });

app.route('/conhecimentos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/conhecimentos.html'));
    });

app.route('/index_adm')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/index_adm.html'));
    });

app.route('/projetos/:id')
    .get((req, res) => {
        project_object.getProjectById(req,res);
    })
   
module.exports = app;
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
