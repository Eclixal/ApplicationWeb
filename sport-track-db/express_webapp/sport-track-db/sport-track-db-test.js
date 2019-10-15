let user_dao = require('./sport-track-db').user_dao;
let activity_dao = require('./sport-track-db').activity_dao;
let activity_entry_dao = require('./sport-track-db').activity_entry_dao;
let db = require('./sport-track-db').db;

let user = ['Michel', 'Crapeau', '975369600', 'FEMME', '185', '60', 'a@a.a', 'coucou'];
user_dao.insert(user);

let user_update = ['Jean-Michel', 'dfdfdfd', '975369600', 'FEMME', '185', '60', 'a@a.a', 'coucou'];
user_dao.update(1, user_update);
// user_dao.delete(1);

user_dao.findByKey(1, function (row) {
    console.log(row);
});

user_dao.findAll(function (rows) {
    console.log(rows);
});

let activity = ['1570538465', 'Test de description', '1'];
activity_dao.insert(activity);

let activity_update = ['1570538465', 'Changement de description', '1'];
activity_dao.update(1, activity_update);
// activity_dao.delete(1);

activity_dao.findByKey(1, function (row) {
    console.log(row);
});

activity_dao.findAll(function (rows) {
    console.log(rows);
});

let activity_entry = ['1', '1570138465', '120', '0.83162338316944', '-0.048522683932858', '1487'];
activity_entry_dao.insert(activity_entry);

let activity_entry_update = ['1', '1570138465', '125', '0.83162338316944', '-0.048522683932858', '1500'];
activity_entry_dao.update(1, activity_entry_update);
// activity_entry_dao.delete(1);

activity_entry_dao.findByKey(1, function (row) {
    console.log(row);
});

activity_entry_dao.findAll(function (rows) {
    console.log(rows);
});