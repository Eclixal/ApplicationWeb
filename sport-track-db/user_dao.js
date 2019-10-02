let db = require('./sqlite_connection');
let UserDAO = function(){
    this.insert = function(values, callback) {

    };
    this.update = function(key, values, callback) {

    };
    this.delete = function(key, callback) {

    };
    this.findAll = function(callback) {
        db.all('SELECT * FROM Account', [], (err, rows) => {
            if (err)
                throw err;

            rows.forEach((row) => {
                console.log(row.name);
            });
        });
    };
    this.findByKey = function(key, callback) {

    };
};
let dao = new UserDAO();


dao.findAll();

module.exports = dao;