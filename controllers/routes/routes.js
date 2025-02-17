
const express = require('express');
const router = express.Router();
const Project  = require('../scripts/CRUD_project'); 
const project_object = new Project();
const Authors = require('../scripts/CRUD_authors_projects');
const authors_object = new Authors();
const path = require('path');

router.route('/cadastroProjetos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/cadastroProjetos.html'));
    })
    .post(async (req,res)=>{
        project_object.addProject(req, res); 
    });
    
router.route('/meusProjetos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/meusProjetos.html'));
    });

router.route('/conhecimentos')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/conhecimentos.html'));
    });

router.route('/index_adm')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '/view/html/index_adm.html'));
    });

router.route('/projetos/:id')
    .get((req, res) => {
        project_object.getProjectById(req,res);

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