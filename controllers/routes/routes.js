
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

//Conhecimentos
const Knowledges = require('../scripts/CRUD_Knowledges');
const Knowledges_object = new Knowledges();

//////////////////////////////////////////////////////////////////

//Rota para homepage
router.get('/', async (req, res) => {
    const projetos = await project_object.getAllProjects(req, res);   
    res.locals.headerTitle = "Projetos da Comunidade";  
    res.render('home', { projetos });
});

router.get('/public/projetos', async (req, res) => {
    const projetos = await project_object.getAllProjects(req, res);   
    res.locals.headerTitle = "Projetos da Comunidade";  
    res.render('home', { projetos });
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
        const project = await project_object.addProject(req, res); 
        const authorNames = req.body.authors_project;
        const keywordNames = req.body.keywords_projects;
        await authors_project_object.updateProjectAuthors(project.id, authorNames);   
        await keywords_project_object.updateProjectKeyword(project.id, keywordNames); 
        res.status(200).json(project);
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
        const id_project = req.params.id; 
        const IsAuthor = await authors_project_object.IsAuthor(id_project, req.session.user_id);
        if (IsAuthor) {
            const project = await project_object.getProjectById(req,res);
            project.authors_project = await authors_project_object.getAuthorProjectById(id_project);
            project.keywords_projects = await keywords_project_object.getKeywordProjectById(id_project); 
            const keywords = await keywords_object.getAllKeywords(req,res);
            const authors = await user_object.getAllUsers(req,res);
            res.render('editProject', {project, keywords, authors});  
        } else {
            res.status(403).send('Usuário sem permissão para editar esse projeto');
        };
    })
    .put(async (req, res)=>{
        const id_project = req.params.id; 
        const IsAuthor = await authors_project_object.IsAuthor(id_project, req.session.user_id);
        if (IsAuthor) {
            await project_object.updateProject(req,res);  
            const authorNames = req.body.authors_project;
            const keywordNames = req.body.keywords_projects;
            await authors_project_object.updateProjectAuthors(id_project, authorNames);   
            await keywords_project_object.updateProjectKeyword(id_project, keywordNames);  
        } else {
            res.status(403).send('Usuário sem permissão para editar esse projeto');
        }
    })    
    .delete(async (req, res) =>{
        const id_project = req.params.id; 
        const IsAuthor = await authors_project_object.IsAuthor(id_project, req.session.user_id);
        if (IsAuthor) {
            await project_object.deleteProject(req, res);  
        } else {
            res.status(403).send('Usuário sem permissão para editar esse projeto');    
        }
    });

router.route('/public/projetos/:id')
    .get(async (req, res) => {
        const project = await project_object.getProjectById(req,res);
        res.locals.isAuthorProject = await authors_project_object.IsAuthor(project.id, req.session.user_id);
        res.render('projeto', {project});
    });

//Rota conhecimentos
router.route('/admin/conhecimentos/:id?')
    .get(async(req, res) => {
        const conhecimentos = await Knowledges_object.getAllKnowledges(req,res);
        res.render('conhecimentos', { conhecimentos }); 
    })
    .post(async (req, res) => {
        await Knowledges_object.addKnowledge(req,res);              
    })
    .put(async (req, res) => {
        await Knowledges_object.updateKnowledge(req,res);
    })
    .delete(async (req, res) => {
        await Knowledges_object.deleteKnowledge(req, res); 
    });


//Rota palavras-chave
router.route('/admin/palavraschave/:id?')
    .get(async(req, res) => {
        const palavrasChave = await keywords_object.getAllKeywords(req,res);
        res.render('palavrasChave', { palavrasChave }); 
    })
    .post(async (req, res) => {
        await keywords_object.addKeyword(req,res);              
    })
    .put(async (req, res) => {
        await keywords_object.updateKeyword(req,res);
    })
    .delete(async (req, res) => {
        await keywords_object.deleteKeyword(req, res); 
    });


//Rota usuários
router.route('/admin/usuarios') 
    .get(async (req, res) => {
        const users = await user_object.getAllUsers(req, res);
        res.render('usuarios', { users } );
    });

router.route('/admin/usuario/:id') 
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

router.route('/admin/usuarioCadastrar') 
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