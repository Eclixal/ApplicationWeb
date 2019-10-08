let db = require('./sqlite_connection');
let UserDAO = function(){

    this.insert = function(values, callback) {
        if (values.length === 8) {
          db.run('INSERT INTO Account (nom, prenom, date_de_naissance, sexe, taille, poids, email, password) VALUES(\'' + values[0] + '\',\'' + values[1] + '\',\'' + values[2] + '\',\'' + values[3] + '\',\'' + values[4] + '\',\'' + values[5] + '\',\'' + values[6] + '\',\'' + values[7] + '\')', (error) => {
              if (error)
                  throw error;
              if (callback)callback();
          });
        } else
            throw "Database error";
    };

    this.update = function(key, values, callback) {
      if (values.length === 8) {
        db.run('UPDATE Account SET nom = \'' + values[0] + '\', prenom = \'' + values[1] + '\', date_de_naissance = \'' + values[2] + '\', sexe = \'' + values[3] + '\', taille = \'' + values[4] + '\', poids = \'' + values[5] + '\', email = \'' + values[6] + '\', password = \'' + values[7] + '\' WHERE id = ' + key, (error) => {
            if (error)
                throw error;
            if (callback) callback();
        });
      } else
          throw "Database error";
    };

    this.delete = function(key, callback) {
      db.run("DELETE FROM Account WHERE id = " + key, (error) => {
          if (error)
              throw error;
          if (callback) callback();
      });
    };

    this.findAll = function(callback) {
        db.all('SELECT * FROM Account', [], (err, rows) => {
            if (err)
                throw err;
            if(callback) callback(rows);
        });
    };

    this.findByKey = function(key, callback) {
        db.get('SELECT * FROM Account WHERE id = ?', [key], (error, row) => {
           if (error)
               throw error;
           if(callback) callback(row);
        });
    };
};
let udao = new UserDAO();
module.exports = udao;