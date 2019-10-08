let db = require('./sqlite_connection');
let ActivityEntryDAO = function(){
    this.insert = function(values, callback) {
        if (values.length === 6) {
          db.run('INSERT INTO Data_activity (uneActivity, time, cardio_frequency, latitude, longitude, altitude) VALUES(\'' + values[0] + '\',\'' + values[1] + '\',\'' + values[2] + '\',\'' + values[3] + '\',\'' + values[4] + '\',\'' + values[5] + '\')', (error) => {
              if (error)
                  throw error;
          });
        }
        else {
          console.log("Database error");
        }
    };

    this.update = function(key, values, callback) {
      if (values.length === 6) {
          db.run('UPDATE Data_activity SET uneActivity = \'' + values[0] + '\', time = \'' + values[1] + '\', cardio_frequency = \'' + values[2] + '\', latitude = \'' + values[3] + '\', longitude = \'' + values[4] + '\', altitude = \'' + values[5] + '\' WHERE id = ' + "'" + key + "'", (error) => {
              if (error) {
                throw error;
              }
          });
      } else {
        console.log("Database error");
      }
    };

    this.delete = function(key, callback) {
      db.run("DELETE FROM Data_activity WHERE id = " + key, (error) => {
          if (error)
              throw error;

      });
    };

    this.findAll = function(callback) {
        db.all('SELECT * FROM Data_activity', [], (err, rows) => {
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
let dao = new ActivityEntryDAO();

module.exports = dao;
