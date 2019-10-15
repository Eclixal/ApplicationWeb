let express = require('express');
let router = express.Router();
let user_dao = require('../sport-track-db').user_dao;
let session = require('express-session');

router.get('/', function(req, res, next) {
    user_dao.findAll(function(rows) {
        res.render('connexion');
    });
});

router.post('/', function (req, res, next) {
    if (req.param('email_user') !== null && req.param('password_user') !== null) {
        user_dao.checkAccount([req.param('email_user'), req.param('password_user')], function (row) {
            if (row !== undefined) {

            } else
                res.send('Le mot de passe ou l\'adresse mail est incorrecte !')
        })
    } else
        res.send('Les champs sont incomplets !');
});

module.exports = router;