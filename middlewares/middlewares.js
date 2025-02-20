module.exports = {
    logRegister(req, res, next) {
        console.log(req.url + ' | ' + req.method + ' | ' + new Date())
        next();
    },

    sessionControl(req, res, next) {
        let activeSession = false;
        if (req.session.user_name != undefined) {
            res.locals.user_id = req.session.user_id;
            res.locals.user_name = req.session.user_name;
            res.locals.user_admin = req.session.user_admin;  
            res.locals.user_external = req.session.user_external;
            activeSession = true;
            next();
        };

        if (!activeSession) {
            res.locals.user_id = -1;
            res.locals.user_name = 'Anônimo';
            res.locals.user_admin = false;
            res.locals.user_external = true;
            if ((req.url == '/login')) next();
            else if ((req.url.startsWith('/public/')) && (req.method == 'GET')) next(); //Paginas sem necessidade de login
            else if ((req.url.startsWith('/projetos/')) && (req.method == 'GET')) next(); //visualizar projetos sem login
            else res.redirect('/login');
        }
    }
};