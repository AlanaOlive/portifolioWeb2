const User = require('../../model/user_model');

class UsersClass{
    async addUser(req,res){
        try {
            const { user_name, adm_roles } = req.body;
            const newUser = await User.create({
              user_name,
              adm_roles
            });
            return res.status(201).json(newUser);
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar o usuário.' });
          }
    }

    async getAllUsers(req,res){
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao obter os usuários.' });
          }
    }

    async getUserById(req,res){
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (user) {
              return res.status(200).json(user);
            } else {
              return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao obter o usuário.' });
          }
    }
    async updateUser(req,res){
        try {
            const { id } = req.params;
            const { user_name, adm_roles } = req.body;
        
            const user = await User.findByPk(id);
            if (user) {
              user.user_name = user_name || user.user_name;
              user.adm_roles = adm_roles !== undefined ? adm_roles : user.adm_roles;
              await user.save();
              return res.status(200).json(user);
            } else {
              return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar o usuário.' });
          }
    }

    async deleteUser(req,res){
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (user) {
              await user.destroy();
              return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
            } else {
              return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar o usuário.' });
          }
    }
}

module.exports = UsersClass;
