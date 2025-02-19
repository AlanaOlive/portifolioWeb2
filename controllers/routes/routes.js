
const express = require('express');
const router = express.Router();
const User = require('../scripts/CRUD_users'); 
const user_object = new User();
const Project  = require('../scripts/CRUD_project'); 
const project_object = new Project();
const Authors = require('../scripts/CRUD_users');
const authors_object = new Authors();
const AuthorsProject = require('../scripts/CRUD_authors_projects');
const authors_project_object = new AuthorsProject();
const Keywords = require('../scripts/CRUD_keywords');
const keywords_object = new Keywords();
const path = require('path');

router.route('/login')
    .get(async(req, res) => {
        await user_object.getLogin(req, res);        
    })
    .post(async(req,res)=>{
        await user_object.postLogin(req, res); 
    });

router.route('/logout')
    .get(async(req, res) => {
        await user_object.getLogout(req, res);        
    });

router.get('/public/projects', (req, res) => {
    project_object.getAllProjects(req, res);
});

router.get('/', (req, res) => {
    project_object.getAllProjects(req, res);
});

router.route('/cadastroProjetos')
    .get(async (req, res) => {
        const authors = await authors_object.getAllUsers(req,res);
        const keywords = await keywords_object.getAllKeywordProjects(req,res);
        res.render('cadastroProjetos', { keywords, authors });        
    })
    .post(async(req,res)=>{
        project_object.addProject(req, res); 
    });
    
router.route('/meusProjetos')
    .get(async (req, res) => {
        let projetos = [];
        const authors = await authors_project_object.getAuthorByUser(req,res);
        if (authors) {
            projetos = await project_object.getProjectsByAuthors(req, res, authors);
        } 
        res.render('home', { projetos });    
        //res.sendFile(path.join(__dirname, '../../view/html/meusProjetos.html'));
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