let db = require('./sqlite_connection');
let UserDAO = function(){
    this.insert = function(values, callback) {
        if (values.length == 7) {
          db.run('INSERT INTO Account VALUES('+values[0]+','+values[1]+','+values[2]+','+values[3]+','+values[4]+','+values[5]+','+values[6]+','+values[7]+')', (error) => {
            if (error) {
              console.log("ERROR",error);
            }
          });
        }
        else {
          console.log("Database error");
        }
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
                console.log(row.nom);
            });
        });
    };
    this.findByKey = function(key, callback) {

    };
};
let dao = new UserDAO();

module.exports = dao;
