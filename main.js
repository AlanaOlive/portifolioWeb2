const express = require('express');
const app = express();
const path = require('path');
const Project = require('./controllers/scripts/add_project');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'controllers')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.route('/cadastroProjetos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/cadastroProjetos.html'));
    })
    .post(async (req,res)=>{
        try {
            const { project_name, project_resume, active } = req.body;
            const newProject = await Project.create({
            project_name,
            project_resume,
            active
            });
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }});

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

app.route('/submmitProject')
    .post(async (req,res)=>{
        Project.addProject();
});
   
module.exports = app;
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
