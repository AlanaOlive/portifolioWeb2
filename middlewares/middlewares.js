module.exports = {
    logRegister(req, res, next) {
        console.log(req.url + ' | ' + req.method + ' | ' + new Date())
        next();
    },

    sessionControl(req, res, next) {
        if (req.session.login != undefined) {
            res.locals.login = req.session.login;
            if (req.session.admin) {
                res.locals.admin = true
            }
            next();
        }
        else if ((req.url == '/') && (req.method == 'GET')) next();
        else if ((req.url == '/login') && (req.method == 'GET')) next();
        else if ((req.url == '/postLogin') && (req.method == 'POST')) next();
        else if ((req.url.startsWith('/styles'))) next();
        else res.redirect('/login');
    }
};