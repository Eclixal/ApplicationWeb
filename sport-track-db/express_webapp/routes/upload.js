let express = require('express');
let router = express.Router();
let user_dao = require('../sport-track-db').user_dao;
let util = require('util');
let formidable = require('formidable');
let fs = require('fs');

router.get('/', function(req, res, next) {
    if (req.session.sessionId) {
        res.render('upload');
    } else
        res.send('Vous devez être authentifié !');
});

router.post('/', function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        fs.readFile(files.activity_summary.path, (err, data) => {
            if (err) throw err;
            let student = JSON.parse(data);
            res.json(student);
            console.log(student);
        });
    });
});

module.exports = router;