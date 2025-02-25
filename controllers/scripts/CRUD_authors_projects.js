
const db = require('../../confg/db_connection'); 
const AuthorProject = require('../../model/authors_projects_model');
const User = require('../../model/user_model');

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

  async getNamesAuthorProjectById(id_project){
    try {
      const authors = await AuthorProject.findAll(
        {
          where:{
            id_project : id_project,
            active: true
          },
          include: [{
            model: User,
            attributes: ['user_name'],
            where: { id: db.col('AuthorProject.id_author') }
          }]
        }
      );
      if (!authors) console.log({ error: 'Registro não encontrado' });
      return authors.map(author => author.User.user_name);
    } catch (error) {
      console.error({ error: 'Erro ao buscar o registro' });
    }
  }

  //get de autor por id
  async getAuthorProjectById(id_project){
    try {
      const authors = await AuthorProject.findAll(
        {
          where:{
            id_project : id_project,
            active: true
          }
        }
      );
      if (!authors) console.log({ error: 'Registro não encontrado' });
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
  };

  async updateProjectAuthors(projectId, authorNames) {
    const authors = await AuthorProject.findAll(
      {
        where:{
          id_project : projectId
        },
        include: [{
          model: User,
          attributes: ['user_name'],
          where: { id: db.col('AuthorProject.id_author') }
        }]
      }
    );
    
    // Desativa autores removidos
    authors.forEach(author => {
      if (author.User && author.User.user_name && !authorNames.includes(author.User.user_name)) {
        author.active = false;
        author.save();
      }
    });

    // Re-ativa ou inclui novos autores
    for (let iNames = 0; iNames < authorNames.length; iNames++) {
      let add = true;
      for (let iAuthors = 0; iAuthors < authors.length; iAuthors++) {  
        if (authorNames[iNames] == authors[iAuthors].User.user_name) {
          add = false;
          if (!authors[iAuthors].active) {
            authors[iAuthors].active = true;
            authors[iAuthors].save();           
          }  
        }
      }
      if (add) {
        let user = await User.findOne({ where: { user_name: authorNames[iNames] } });
        if (user) {
          await AuthorProject.create({
              id_project: projectId,
              id_author: user.id,
              active: true,
              last_update: new Date()
          })
        }       
      }
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

  async IsAuthor(id_project, id_user) {
    try {
      if (id_project && id_user) {
        const authors = await AuthorProject.findAll(
          {
            where:{
              id_project : id_project,
              id_author : id_user
            }
          }
        );
        return (authors.length > 0);
      } else {
        return false;
      }
    } catch (error) {
      console.error({ error: 'Erro ao buscar o registro' });
    }    
  }
}

module.exports = AuthorProjectClass;