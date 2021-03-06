let express = require('express');
let router = express.Router();
let user_dao = require('../sport-track-db').user_dao;

router.get('/', function(req, res, next) {
    user_dao.findAll(function(rows) {
        res.render('users', {data:rows});
  });
});

router.get('/inscription/', function(req, res, next) {
    user_dao.findAll(function(rows) {
        res.render('inscription');
    });
});

router.post('/inscription/', function (req, res, next) {
    if (req.param('nom_user') !== null && req.param('prenom_user') !== null && req.param('date_user') !== null
        && req.param('sexe_user') !== null && req.param('taille_user') !== null && req.param('poids_user') !== null
        && req.param('email_user') !== null && req.param('password_user') !== null) {
        user_dao.findByEmail(req.param('email_user'), function (row) {
            if (row === undefined) {
                user_dao.insert([req.param('nom_user'), req.param('prenom_user'), new Date(req.param('date_user')).getTime()/1000, req.param('sexe_user'), req.param('taille_user'), req.param('poids_user'), req.param('email_user'), req.param('password_user')]);
                res.render('message', {message:'Votre compte a bien été créé !'});
            } else
                res.render('message', {message:'Un compte existe déjà !'});
        });
    } else
        res.render('message', {message:'Les champs sont incomplets !'});
});

module.exports = router;