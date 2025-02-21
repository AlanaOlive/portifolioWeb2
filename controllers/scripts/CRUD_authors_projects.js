const AuthorProject = require('../../model/authors_projects_model');

class AuthorProjectClass{
  // Criar um novo registro
  async addAuthor(req, res, id_project){
    try {
      const authors = req.body.authors_project; 
      const active = req.body.active;     
      const last_update = new Date();

      if (!authors || !Array.isArray(authors) || authors.length === 0) {
        console.log({ error: 'Nenhum autor informado ou formato inválido.' });
      }
  
      const authorProjectPromises = authors.map(author => {
        if (!author) {
          console.log({ error: 'ID de autor inválido', author });
        }
  
        AuthorProject.create({
          id_author: author,
          id_project,
          active,
          last_update
        });
      });
       await Promise.all(authorProjectPromises);
    } catch (error) {
      console.log({ error: 'Erro ao criar o registro' });
    }
  }

  //get de todos os autores
  async getAllAuthors(req, res){
    try {
      const authors = await AuthorProject.findAll(
        {
          where:{
            active: 1
          }
        }        
      );
      res.send({authors});
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os registros' });
    }
  }

  //get de autores por usuario logado
  async getAuthorByUser(req, res){
    try {
      const authors = await AuthorProject.findAll(
        {
          where:{
            id_author: req.session.user_id,
            active: 1
            
          }
        }        
      );
      return authors;
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os registros' });
    }
  }

  //get de autor por id
  async getAuthorById(req, res, id_project){
    try {
      const authors = await AuthorProject.findAll(
        {
          where:{
            id_project : id_project
          }
        }
      );
      if (!entry) console.log({ error: 'Registro não encontrado' });
      return authors
    } catch (error) {
      console.error({ error: 'Erro ao buscar o registro' });
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

module.exports = AuthorProjectClass;