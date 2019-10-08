let db = require('./sqlite_connection');
let ActivityDAO = function(){
    this.insert = function(values, callback) {
        if (values.length === 8) {
          db.run('INSERT INTO Activity (date, description, unAccount) VALUES(\'' + values[0] + '\',\'' + values[1] + '\',\'' + values[2] + '\',\'' + values[3] + '\')', (error) => {
              if (error)
                  throw error;
          });
        }
        else {
          console.log("Database error");
        }
    };

    this.update = function(key, values, callback) {
      if (values.length === 8) {
        new Promise ((resolve,reject) => {
          db.run('UPDATE Activity SET date = \'' + values[0] + '\', description = \'' + values[1] + '\', unAccount = \'' + values[2] + '\' WHERE id = ' + "'" + key + "'", (error) => {
              if (error) {
                throw error;
              }
          });
        });
      } else {
        console.log("Database error");
      }
    };

    this.delete = function(key, callback) {
      db.run("DELETE FROM Activity WHERE id = " + key, (error) => {
          if (error)
              throw error;

      });
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
let dao = new ActivityDAO();

module.exports = dao;
