
const express = require('express');
const router = express.Router();
const User = require('../scripts/CRUD_users'); 
const user_object = new User();
const Project  = require('../scripts/CRUD_project'); 
const project_object = new Project();
const Authors = require('../scripts/CRUD_users');
const authors_object = new Authors();
const Keywords = require('../scripts/CRUD_keywords');
const keywords_object = new Keywords();
const path = require('path');

/* Rotas de usuário */
router.get('/login', user_object.getLogin);
router.post('/postLogin', user_object.postLogin);
router.get('/logout', user_object.getLogout);

router.get('/', (req, res) => {
    project_object.getAllProjects(req, res);
});

router.route('/cadastroProjetos')
    .get(async (req, res) => {
        const authors = await authors_object.getAllUsers(req,res);
        const keywords = await keywords_object.getAllKeywordProjects(req,res);
        res.render('cadastroProjetos', { keywords, authors });        
    })
    .post( async(req,res)=>{
        project_object.addProject(req, res); 
    });
    
router.route('/meusProjetos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../view/html/meusProjetos.html'));
    });

router.route('/conhecimentos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../view/html/conhecimentos.html'));
    });

router.route('/index_adm')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../view/html/index_adm.html'));
    });

router.route('/editProject/:id')
    .get(async (req,res) =>{
        const project = await project_object.getProjectById(req,res);
        const keywords = await keywords_object.getAllKeywordProjects(req,res);
        const authors = await authors_object.getAllUsers(req,res);
        res.render('editProject', {project, keywords, authors});
    })
    .put((req, res)=>{
        project_object.updateProject(req,res);
    })

router.route('/projetos/:id')
    .get(async (req, res) => {
        const project = await project_object.getProjectById(req,res);
        res.render('projeto', {project});

    })
    .delete((req, res) =>{
        project_object.deleteProject(req, res);
    })

router.route('/author-projects')
    .post((req,res)=>{
        authors_object.addAuthor(req,res);
    })
    .get((req,res) =>{
        authors_object.getAllAuthors(req,res);
    })

router.route('/author-projects/:id')
    .get((req,res)=>{
        authors_object.getAuthorById(req,res);
    })
    .put((req,res) =>{
        authors_object.updateAuthor(req,res);
    })
    .delete((req,res) =>{
        authors_object.deleteAuthor(req,res);
    })

module.exports = router;