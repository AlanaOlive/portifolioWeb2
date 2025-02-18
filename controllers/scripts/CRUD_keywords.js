const KeywordProject = require('../../model/keyword_projects_model');
class KeywordsClass{
    // CREATE - Cria um novo KeywordProject
    async createKeywordProject(req, res){
        try {
            const { id_project, keyword } = req.body;

            // Validação simples
            if (!id_project || !keyword) {
            return res.status(400).json({ error: 'id_project e keyword são obrigatórios' });
            }

            const newKeywordProject = await KeywordProject.create({
            id_project,
            keyword,
            active: true,
            last_update: new Date(),
            });

            res.status(201).json(newKeywordProject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    };

    // READ - Recupera todos os KeywordProjects
    async getAllKeywordProjects(req, res){
        try {
            const keywordProjects = await KeywordProject.findAll(
                {
                    where:{
                        active: 1
                    }
                }
            );
            res.send({keywordProjects});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    };

    // READ by ID - Recupera um KeywordProject pelo ID
    async getKeywordProjectById(req, res){
        const { id } = req.params;
        try {
            const keywordProject = await KeywordProject.findByPk(id);

            if (!keywordProject) {
            return res.status(404).json({ error: 'KeywordProject não encontrado' });
            }

            res.status(200).json(keywordProject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    };

    // UPDATE - Atualiza um KeywordProject
    async updateKeywordProject(req, res){
        const { id } = req.params;
        const { id_project, keyword, active } = req.body;
        try {
            const keywordProject = await KeywordProject.findByPk(id);

            if (!keywordProject) {
            return res.status(404).json({ error: 'KeywordProject não encontrado' });
            }

            // Atualizando o projeto
            keywordProject.id_project = id_project || keywordProject.id_project;
            keywordProject.keyword = keyword || keywordProject.keyword;
            keywordProject.active = active !== undefined ? active : keywordProject.active;
            keywordProject.last_update = new Date();

            await keywordProject.save();

            res.status(200).json(keywordProject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    };

    // DELETE - Deleta um KeywordProject
    async deleteKeywordProject(req, res){
        const id = req.params.id;
        try {
            const keywordProject = await KeywordProject.findByPk(id);
            if (!keywordProject) {
            return res.status(404).json({ error: 'KeywordProject não encontrado' });
            }
        keywordProject.active = 0;
        keywordProject.Date = new Date();

            res.status(204).send();  
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    };
}
module.exports = KeywordsClass;