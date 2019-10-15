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
                res.send('Vous venez de vous connecter');
            } else
                res.send('Le mot de passe ou l\'adresse mail est incorrecte !')
        })
    } else
        res.send('Les champs sont incomplets !');
});

router.post('/disconnect', function (req, res, next) {
   if (req.session.sessionId !== undefined) {
       req.session.destroy();
       res.send('La deconnexion a été effectuée avec succès !');
   } else
       res.send('Vous n\'êtes pas authentifié');
});

module.exports = router;