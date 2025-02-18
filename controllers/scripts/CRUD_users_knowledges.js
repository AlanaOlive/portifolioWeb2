const UserKnowledge = require('../models/UserKnowledge');

class userKnowledgesClass{
  async addUserKnowledges(req,res){
    try {
      const { id_user, active } = req.body;
      const newUserKnowledge = await UserKnowledge.create({
        id_user,
        active,
      });
      return res.status(201).json(newUserKnowledge);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar o conhecimento do usuário.' });
    }
  }

  async getAllUserKnowledges(req,res){
    try {
      const userKnowledges = await UserKnowledge.findAll(
        {
          where:{
            active: 1
          }
        }
      );
      return res.status(200).json(userKnowledges);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter os conhecimentos dos usuários.' });
    }
  }

  async getUserKnowledgeById(req,res){
    try {
      const { id } = req.params;
      const userKnowledge = await UserKnowledge.findByPk(id);
      if (userKnowledge) {
        return res.status(200).json(userKnowledge);
      } else {
        return res.status(404).json({ message: 'Conhecimento do usuário não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter o conhecimento do usuário.' });
    }
  }

  async updateUserKnowledge(req,res){
    try {
      const { id } = req.params;
      const { id_user, active } = req.body;
  
      const userKnowledge = await UserKnowledge.findByPk(id);
      if (userKnowledge) {
        userKnowledge.id_user = id_user || userKnowledge.id_user;
        userKnowledge.active = active || userKnowledge.active;
        userKnowledge.last_update = new Date();
        
        await userKnowledge.save();
        return res.status(200).json(userKnowledge);
      } else {
        return res.status(404).json({ message: 'Conhecimento do usuário não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar o conhecimento do usuário.' });
    }
  }

  async deleteUserKnowledge(req,res){
    try {
      const { id } = req.params;
      const userKnowledge = await UserKnowledge.findByPk(id);
      if (userKnowledge) {
        userKnowledge.active = 0;
        userKnowledge.last_update = new Date();
        return res.status(200).json({ message: 'Conhecimento do usuário deletado com sucesso.' });
      } else {
        return res.status(404).json({ message: 'Conhecimento do usuário não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar o conhecimento do usuário.' });
    }
  }
}

module.exports = userKnowledgesClass;
