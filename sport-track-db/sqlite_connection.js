let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./sport_track.db');

module.exports = db;