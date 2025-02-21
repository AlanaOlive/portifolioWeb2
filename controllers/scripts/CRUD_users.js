const User = require('../../model/user_model');
const path = require('path');

class UserClass{
    async addUser(req,res){
        try {
            const { user_name, password,  adm_roles } = req.body;
            const newUser = await User.create({
              user_name,
              password,
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
            return users;
            //res.render('cadastroProjetos', {users});
            //return res.status(200).json(users);
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
              return user;
            } else {
              console.log({ message: 'Usuário não encontrado.' });
            }
          } catch (error) {
            console.error(error);            
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

    async getLogin(req, res) {
      res.sendFile(path.join(__dirname, '../..', 'view', 'html', 'login.html'))
    }

    async postLogin(req, res) {
      try {
        var userLogin = {
            user_name: req.body.user_name,
            user_id: 0
        }

        const users = await User.findAll({ 
          where: {
            user_name: req.body.user_name,
            password: req.body.password
          } 
        });
        
        if (users.length > 0) { 
          req.session.user_name = req.body.user_name;
          req.session.user_id = users[0].id;
          req.session.user_admin = users[0].adm_roles;
          req.session.user_external = false;

          res.locals.user_name = req.body.user_name; 
          res.locals.user_id = users[0].id;
          res.locals.user_admin = users[0].adm_roles;
          res.locals.user_external = false;

          userLogin.user_id = users[0].id;
          res.redirect('/');     
        }
        else {
          res.status(404).json({message: 'Credenciais inválidas' });  
        }  
      } catch (error) {
        console.error('Erro fazer login:', error);
        res.status(500).send('Erro fazer login');
      }   
    }

    async getLogout(req, res) {
      req.session.destroy();
      res.redirect('/login');
    }
}

module.exports = UserClass;
