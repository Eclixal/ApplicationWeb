let db = require('./sqlite_connection');
let ActivityDAO = function(){

    this.insert = function(values, callback) {
        if (values.length === 3) {
          db.run('INSERT INTO Activity (date, description, unAccount) VALUES(\'' + values[0] + '\',\'' + values[1] + '\',\'' + values[2] + '\')', function (error) {
              if (error)
                  throw error;
              if (callback) callback(this.lastID);
          });
        }
        else
          throw "Database error";
    };

    this.update = function(key, values, callback) {
      if (values.length === 3) {
          db.run('UPDATE Activity SET date = \'' + values[0] + '\', description = \'' + values[1] + '\', unAccount = \'' + values[2] + '\' WHERE id = ' + "'" + key + "'", (error) => {
              if (error)
                throw error;
              if (callback) callback();
          });
      } else
          throw "Database error";
    };

    this.delete = function(key, callback) {
      db.run("DELETE FROM Activity WHERE id = " + key, (error) => {
          if (error)
              throw error;
          if (callback) callback();
      });
    };

    this.findAll = function(callback) {
        db.all('SELECT * FROM Activity', [], (err, rows) => {
            if (err)
                throw err;
            if (callback) callback(rows);
        });
    };
    this.findByKey = function(key, callback) {
        db.get('SELECT * FROM Activity WHERE id = ?', [key], (error, row) => {
            if (error)
                throw error;
            if(callback) callback(row);
        });
    };
};
let adao = new ActivityDAO();
module.exports = adao;
