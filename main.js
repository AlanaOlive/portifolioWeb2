const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'controllers')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.route('/cadastroProjetos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/cadastroProjetos.html'));
    })

    .post((req,res, project)=>{

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

app.route('/controllers/scripts/add_project')
    .get((req,res) => {
        res.sendFile(path.join(__dirname, '/controllers/scripts/add_project.js'));
    });

app.route('/model/projects_model')
    .get((req,res) => {
        res.sendFile(path.join(__dirname, '/model/projects_model.js'));
    });
   

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
