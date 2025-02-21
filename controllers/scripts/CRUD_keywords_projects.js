const KeywordProject = require('../../model/keyword_projects_model');
class KeywordsProjectClass{
    // CREATE - Cria um novo KeywordProject
    async createKeywordProject(req, res, id_project){
        try {
            const keywords = req.body.keywords_projects;     
            const active = req.body.active;
            const last_update = new Date();
            const keywordProjectPromises = keywords.map(keyword => {
                KeywordProject.create({
                  id_keyword: keyword,  
                  id_project,
                  active,
                  last_update
                });
              });
              await Promise.all(keywordProjectPromises);
        } catch (error) {
            console.error(error);          
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
            return keywordProjects;
        } catch (error) {
            console.error(error);            
        }
    };

    // READ by ID - Recupera um KeywordProject pelo ID
    async getKeywordProjectById(req, res, id_project){
        
        try {
            const keywordsProject = await KeywordProject.findAll({
                where:{
                    id_project : id_project
                }
            });

            if (!keywordProject) {
            console.log({ error: 'KeywordProject não encontrado' });
            }
            return keywordsProject;
        } catch (error) {
            console.error(error);            
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
        } catch (error) {
            console.error(error);
        }
    };

    // DELETE - Deleta um KeywordProject
    async deleteKeywordProject(req, res){
        const id = req.params.id;
        try {
            const keywordProject = await KeywordProject.findByPk(id);
            if (!keywordProject) {
            console.log({ error: 'KeywordProject não encontrado' });
            }
        keywordProject.active = 0;
        keywordProject.Date = new Date();
        
        } catch (error) {
            console.error(error);
        }
    };
}
module.exports = KeywordsProjectClass;