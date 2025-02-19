module.exports = {
    logRegister(req, res, next) {
        console.log(req.url + ' | ' + req.method + ' | ' + new Date())
        next();
    },

    sessionControl(req, res, next) {
        let activeSession = false;
        if (req.session.login != undefined) {
            res.locals.login = req.session.login;
            res.locals.admin = req.session.admin  
            activeSession = true;
            next();
        };

        if (!activeSession) {
            res.locals.login = 'Anônimo';
            res.locals.admin = false;
            if ((req.url == '/login')) next();
            else if ((req.url.startsWith('/public/')) && (req.method == 'GET')) next(); //Paginas sem necessidade de login
            else if ((req.url.startsWith('/projetos/')) && (req.method == 'GET')) next(); //visualizar projetos sem login
            else res.redirect('/login');
        }
    }
};