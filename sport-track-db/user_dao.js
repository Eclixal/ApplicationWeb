let db = require('./sqlite_connection');
let UserDAO = function(){
    this.insert = function(values, callback) {
        if (values.length === 8) {
          db.run('INSERT INTO Account (nom, prenom, date_de_naissance, sexe, taille, poids, email, password) VALUES(\'' + values[0] + '\',\'' + values[1] + '\',\'' + values[2] + '\',\'' + values[3] + '\',\'' + values[4] + '\',\'' + values[5] + '\',\'' + values[6] + '\',\'' + values[7] + '\')', (error) => {
            if (error) {
              console.log("Database error",error);
            }
          });
        }
        else {
          console.log("Database error");
        }
    };

    this.update = function(key, values, callback) {
      if (values.length === 8) {
        db.run('UPDATE INTO Account (nom, prenom ,date_de_naissance, sexe, taille, poids, email, password) VALUES (\'' + values[0] + '\',\'' + values[1] + '\',\'' + values[2] + '\',\'' + values[3] + '\',\'' + values[4] + '\',\'' + values[5] + '\',\'' + values[6] + '\',\'' + values[7] + '\') WHERE id = ' + "'" + key + "'", (error) => {
          if (error) {
            console.log("Database error",error);
          }
        });
      }
      else {
        console.log("Database error");
      }
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

let t = ['Michel', 'Crapeau', '975369600', 'FEMME', '185', '60', 'a@a.a', 'coucou'];
dao.insert(t, null);

module.exports = dao;
