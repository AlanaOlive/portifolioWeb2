const express = require('express');
const router = express.Router();
const AuthorProject = require('../models/AuthorProject');

// Criar um novo registro
router.post('/author-projects', async (req, res) => {
  try {
    const { id_author, id_project, active } = req.body;
    const newEntry = await AuthorProject.create({ id_author, id_project, active });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o registro' });
  }
});

// Obter todos os registros
router.get('/author-projects', async (req, res) => {
  try {
    const entries = await AuthorProject.findAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os registros' });
  }
});

// Obter um registro pelo ID
router.get('/author-projects/:id', async (req, res) => {
  try {
    const entry = await AuthorProject.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Registro não encontrado' });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o registro' });
  }
});

// Atualizar um registro pelo ID
router.put('/author-projects/:id', async (req, res) => {
  try {
    const { id_author, id_project, active } = req.body;
    const entry = await AuthorProject.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Registro não encontrado' });
    
    await entry.update({ id_author, id_project, active, last_update: new Date() });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o registro' });
  }
});

// Excluir um registro pelo ID
router.delete('/author-projects/:id', async (req, res) => {
  try {
    const entry = await AuthorProject.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Registro não encontrado' });
    
    await entry.destroy();
    res.status(200).json({ message: 'Registro excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o registro' });
  }
});

module.exports = router;