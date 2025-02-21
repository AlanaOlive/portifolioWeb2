
const express = require('express');
const router = express.Router();

//Usuario autores
const User = require('../scripts/CRUD_users'); 
const user_object = new User();

//Projeto
const Project  = require('../scripts/CRUD_project'); 
const project_object = new Project();

//Tabela autores, faz vinculo de projeto x autor
const AuthorsProject = require('../scripts/CRUD_authors_projects');
const authors_project_object = new AuthorsProject();

//Palavras chave vinculadas ao projeto
const KeywordsProject = require('../scripts/CRUD_keywords_projects');
const keywords_project_object = new KeywordsProject();

//Palavras chave padrão
const Keywords = require('../scripts/CRUD_keywords');
const keywords_object = new Keywords();
//////////////////////////////////////////////////////////////////

//Rota para homepage
router.get('/', (req, res) => {
    project_object.getAllProjects(req, res);
    // const keywords = keywords_project_object.getKeywordProjectById(req, res, projetos.id);
    // const id_authors = authors_project_object.getAuthorById(req,res, projetos.id);
    // const authors = user_object.getUserById(id_authors)
    // res.locals.headerTitle = "Software House";
    // res.render('home', { projetos/*, keywords, authors*/ });
});

router.get('/public/projetos', (req, res) => {
    project_object.getAllProjects(req, res);      
});


//Rotas de login
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


 //Rotas de projetos   
router.route('/cadastroProjetos')
    .get(async (req, res) => {
        const authors = await user_object.getAllUsers(req,res);
        const keywords = await keywords_object.getAllKeywords(req,res);
        res.render('cadastroProjetos', { keywords, authors });        
    })
    .post(async(req,res)=>{
        const id_project = await project_object.addProject(req, res); 
        await authors_project_object.addAuthor(req,res, id_project);
        await keywords_project_object.createKeywordProject(req,res,id_project);
        res.redirect('/');
    });
    
router.route('/meusProjetos')
    .get(async (req, res) => {
        let projetos = [];
        const authors = await authors_project_object.getAuthorByUser(req,res);
        if (authors) {
            projetos = await project_object.getProjectsByAuthors(req, res, authors);
        } 
        res.locals.headerTitle = "Meus Projetos";
        res.render('home', { projetos });    
    });

router.route('/editProject/:id')
    .get(async (req,res) =>{
        const project = await project_object.getProjectById(req,res);
        const keywords = await keywords_project_object.getAllKeywordProjects(req,res);
        const authors = await user_object.getAllUsers(req,res);
        res.render('editProject', {project, keywords, authors});
    })
    .put((req, res)=>{
        project_object.updateProject(req,res);
    });

router.route('/projetos/:id')
    .get(async (req, res) => {
        const project = await project_object.getProjectById(req,res);
        res.render('projeto', {project});
    })
    .delete((req, res) =>{
        project_object.deleteProject(req, res);
    });


//Rota conhecimentos
router.route('/conhecimentos')
    .get((req, res) => {
        res.render('conhecimentos'); 
    });


//Rota usuários
router.route('/usuarios') 
    .get(async (req, res) => {
        const users = await user_object.getAllUsers(req, res);
        res.render('usuarios', { users } );
    });

router.route('/usuario/:id') 
    .get(async (req, res) => {
        const user = await user_object.getUserById(req, res);
        res.render('editUsuario', { user } );
    })
    .put(async (req, res) => {
        await user_object.updateUser(req,res);
    })
    .delete(async (req, res) => {
        await user_object.deleteUser(req, res); 
    });

router.route('/usuarioCadastrar') 
    .get(async (req, res) => {
        const user = []; 
        res.render('editUsuario', { user });
    })
    .post(async (req, res) => {
        await user_object.addUser(req,res);              
    });


//Rota autores, crud que faz vinculo com projetos
router.route('/author-projects')
    .post((req,res)=>{
        authors_object.addAuthor(req,res);
    })
    .get((req,res) =>{
        authors_object.getAllAuthors(req,res);
    });

router.route('/author-projects/:id')
    .get((req,res)=>{
        authors_object.getAuthorById(req,res);
    })
    .put((req,res) =>{
        authors_object.updateAuthor(req,res);
    })
    .delete((req,res) =>{
        authors_object.deleteAuthor(req,res);
    });

module.exports = router;