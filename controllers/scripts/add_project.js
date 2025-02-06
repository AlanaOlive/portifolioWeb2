const express = require('express');
const Project = require('../../model/projects_model'); 
const app = express();

app.use(express.json());

//cria novo projeto
function addProject(){
  app.post('/submmitProject', async (req, res) => {
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
    }
  });
}


//get de todos os projetos no bd

app.get('/cadastroProjetos', async (req, res) => {
  try {
    const cadastroProjetos = await Project.findAll();
    res.status(200).json(cadastroProjetos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get por id de projeto
app.get('/cadastroProjetos/:id', async (req, res) => {
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
});

// atualiza projeto 
app.put('/cadastroProjetos/:id', async (req, res) => {
  const { id } = req.params;
  const { project_name, project_resume, active } = req.body;

  try {
    const project = await Project.findByPk(id);
    if (project) {
      project.project_name = project_name || project.project_name;
      project.project_resume = project_resume || project.project_resume;
      project.active = active !== undefined ? active : project.active;
      project.last_update = new Date(); // Update the last_update field

      await project.save();
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// deleta projeto - nao usaremos provavelmente
app.delete('/cadastroProjetos/:id', async (req, res) => {
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
});

// Inicia o servidor
//app.listen(port, () => {
//  console.log(`Servidor rodando em http://localhost:${port}`);
//});
