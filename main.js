const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

//app.use(express.static(''));

// Rota principal para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
