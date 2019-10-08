let user_dao = require('./sport-track-db').user_dao;
let db = require('./sport-track-db').db;

// let t = ['Michel', 'Crapeau', '975369600', 'FEMME', '185', '60', 'a@a.a', 'coucou'];
// user_dao.insert(t, null);

let t1 = ['Jean-Michel', 'Crapeau', '975369600', 'FEMME', '185', '60', 'a@a.aa', 'coucou'];
user_dao.update(3, t1, null);

