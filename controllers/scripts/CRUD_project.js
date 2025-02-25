const Project = require('../../model/projects_model'); 
const AuthorsProject = require('../scripts/CRUD_authors_projects');
const authors_project_object = new AuthorsProject();
const KeywordsProject = require('../scripts/CRUD_keywords_projects');
const keywords_project_object = new KeywordsProject();

class ProjectClass {
  // Cria novo projeto
  async addProject(req, res) {
    try {      
      const { project_name, project_resume, project_link, active } = req.body;
      const newProject = await Project.create({
        project_name,
        project_resume,
        project_link,
        active
      });
      return newProject;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get de todos os projetos no BD que estão ativos
  async getAllProjects(req, res) {
    try {
      const projetos = await Project.findAll(
      {
        where:{
          active : 1
        }
      });  // Busca os projetos do banco  
      for (let i = 0; i < projetos.length; i++) {  
        projetos[i].authors_project = await authors_project_object.getNamesAuthorProjectById(projetos[i].id);
        projetos[i].keywords_projects = await keywords_project_object.getNamesKeywordProjectById(projetos[i].id);  
      };
      return projetos;
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      res.status(500).send('Erro ao carregar projetos');
    }
  }

  // Get de projetos por autores
  async getProjectsByAuthors(req, res, authors_project) {
    try {
      const projectIds = authors_project.map(item => item.id_project);
      const projetos = await Project.findAll({
        where:{
          id: projectIds, 
          active : 1
        }
      }); 
      for (let i = 0; i < projetos.length; i++) {  
        projetos[i].authors_project = await authors_project_object.getNamesAuthorProjectById(projetos[i].id);
        projetos[i].keywords_projects = await keywords_project_object.getNamesKeywordProjectById(projetos[i].id);  
      };
      return projetos;
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      res.status(500).send('Erro ao carregar projetos');
    }
  }

  // Get por ID de projeto
  async getProjectById(req, res) {
    const id = req.params.id; 
    try {
      const project = await Project.findByPk(id);
      return project;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Atualiza projeto
  async updateProject(req, res) {
    const { id } = req.params;
    const { project_name, project_resume, project_link, active } = req.body;

    try {
      const project = await Project.findByPk(id);
      if (project) {
        project.project_name = project_name || project.project_name;
        project.project_resume = project_resume || project.project_resume;
        project.project_link = project_link || project.project_link;
        project.active = active !== undefined ? active : project.active;
        project.last_update = new Date(); // Atualiza o campo last_update

        await project.save();
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Deleta projeto
  async deleteProject(req, res) { 
    const id  = req.params.id;
    try {
      const project = await Project.findByPk(id);
      if (project) {
        project.active = 0;
        project.last_update = new Date();
        await project.save();
        res.redirect('/');
      } else {
        res.status(404).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProjectClass;
