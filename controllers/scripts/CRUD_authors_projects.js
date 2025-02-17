const AuthorProject = require('../models/AuthorProject');

class AuthorsClass{
  // Criar um novo registro
  async addAuthor(req, res){
    try {
      const { id_author, id_project, active } = req.body;
      const newEntry = await AuthorProject.create({ id_author, id_project, active });
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o registro' });
    }
  }

  //get de todos os autores
  async getAllAuthors(req, res){
    try {
      const entries = await AuthorProject.findAll();
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os registros' });
    }
  }

  //get de autor por id
  async getAuthorById(req, res){
    try {
      const entry = await AuthorProject.findByPk(req.params.id);
      if (!entry) return res.status(404).json({ error: 'Registro não encontrado' });
      res.status(200).json(entry);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o registro' });
    }
  }

  //atualizar dados de autor
  async updateAuthor(req, res){
    try {
      const { id_author, id_project, active } = req.body;
      const entry = await AuthorProject.findByPk(req.params.id);
      if (!entry) return res.status(404).json({ error: 'Registro não encontrado' });
      
      await entry.update({ id_author, id_project, active, last_update: new Date() });
      res.status(200).json(entry);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
    }
  }

  //deleta autor
  async deleteAuthor(req, res){
    try {
      const entry = await AuthorProject.findByPk(req.params.id);
      if (!entry) return res.status(404).json({ error: 'Registro não encontrado' });
      entry.active = 0;
      entry.last_update = new Date()      ;
      res.status(200).json({ message: 'Registro excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o registro' });
    }
  }

}

module.exports = AuthorsClass;