const Knowledge = require('../../model/knowledges_model');

class KnowledgeClass{
    //add conhecimento
    async addKnowledge(req,res){
        try {
            const { description } = req.body;
            const newKnowledge = await Knowledge.create({
              description,
              active,
            });
            return res.status(201).json(newKnowledge);
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar conhecimento.' });
          }
    }

    //buscar todos os conhecimentos
    async getAllKnowledges(req,res){
        try {
            const knowledges = await Knowledge.findAll(
              {
                where:{
                  active: 1
                }
              }
            );
            return res.status(200).json(knowledges);
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao obter conhecimentos.' });
          }
    }

    //buscar por id
    async getKnowledgeById(req,res){
        try {
            const { id } = req.params;
            const knowledge = await Knowledge.findByPk(id);
            if (knowledge) {
              return res.status(200).json(knowledge);
            } else {
              return res.status(404).json({ message: 'Conhecimento não encontrado.' });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao obter o conhecimento.' });
          }
    }

    //atualiza conhecimento
    async updateKnowledge(req,res){
        try {
            const { id } = req.params;
            const { description, active } = req.body;
        
            const knowledge = await Knowledge.findByPk(id);
            if (knowledge) {
              knowledge.description = description || knowledge.description;
              knowledge.active = active || knowledge.active;
              knowledge.last_update = new Date();
              
              await knowledge.save();
              return res.status(200).json(knowledge);
            } else {
              return res.status(404).json({ message: 'Conhecimento não encontrado.' });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar conhecimento.' });
          }
    }

    //deletar conhecimento
    async deleteKnowledge(req,res){
        try {
            const { id } = req.params;
            const knowledge = await Knowledge.findByPk(id);
            if (knowledge) {
              knowledge.active = 0;
              knowledge.last_update = new Date();
              return res.status(200).json({ message: 'Conhecimento deletado com sucesso.' });
            } else {
              return res.status(404).json({ message: 'Conhecimento não encontrado.' });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar conhecimento.' });
          }
    }

}

module.exports = KnowledgeClass;
