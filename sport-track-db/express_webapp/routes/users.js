let express = require('express');
let router = express.Router();
let user_dao = require('sport-track-db').user_dao;
router.get('/', function(req, res, next) {
    user_dao.findAll(function(rows) {
      res.render('users', {data:rows});
  });
});
module.exports = router;