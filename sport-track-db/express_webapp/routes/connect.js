let express = require('express');
let router = express.Router();
let user_dao = require('../sport-track-db').user_dao;


router.get('/', function(req, res, next) {
    user_dao.findAll(function(rows) {
        res.render('connexion');
    });
});

router.post('/', function (req, res, next) {
    if (req.param('email_user') !== null && req.param('password_user') !== null) {
        user_dao.checkAccount([req.param('email_user'), req.param('password_user')], function (row) {
            if (row !== undefined) {
                req.session.sessionId = row.id;
                res.render('message', {message:'Vous venez de vous connecter'});
            } else
                res.render('message', {message:'Le mot de passe ou l\'adresse mail est incorrecte !'});
        })
    } else
        res.render('message', {message:'Le mot de passe ou l\'adresse mail est incorrecte !'});
});

router.post('/disconnect', function (req, res, next) {
   if (req.session.sessionId !== undefined) {
       req.session.destroy();
       res.render('message', {message:'La deconnexion a été effectuée avec succès !'});
   } else
       res.render('message', {message:'Vous n\'êtes pas authentifié'});
});

module.exports = router;