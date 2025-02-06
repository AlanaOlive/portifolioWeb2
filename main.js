const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('portifolioWeb2'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.get('/cadastroProjetos', (req,res) => {
    res.sendFile(__dirname + '/view/html/cadastroProjetos.html');
});

app.get('/meusProjetos', (req, res) => {
    res.sendFile(__dirname, '/view/html/meusProjetos.html');
});

app.get('/conhecimentos', (req, res) => {
    res.sendFile(__dirname, '/view/html/conhecimentos.html');
});

app.get('/index_adm', (req, res) => {
    res.sendFile(__dirname, '/view/html/index_adm.html');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
