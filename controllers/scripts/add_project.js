const Project = require('../../model/projects_model'); 

class ProjectClass {
  // Cria novo projeto
  async addProject(req, res) {
    try {      
      const { project_name, project_resume, active } = req.body;
      const newProject = await Project.create({
        project_name,
        project_resume,
        active
      });
      res.status(201).json(newProject);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get de todos os projetos no BD
  async getAllProjects(req, res) {
    try {
      const cadastroProjetos = await Project.findAll();
      res.status(200).json(cadastroProjetos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get por ID de projeto
  async getProjectById(req, res) {
    const { id } = req.params;
    try {
      const project = await Project.findByPk(id);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Atualiza projeto
  async updateProject(req, res) {
    const { id } = req.params;
    const { project_name, project_resume, active } = req.body;

    try {
      const project = await Project.findByPk(id);
      if (project) {
        project.project_name = project_name || project.project_name;
        project.project_resume = project_resume || project.project_resume;
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

  // Deleta projeto (não usaremos provavelmente)
  async deleteProject(req, res) {
    const { id } = req.params;
    try {
      const project = await Project.findByPk(id);
      if (project) {
        await project.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProjectClass;
