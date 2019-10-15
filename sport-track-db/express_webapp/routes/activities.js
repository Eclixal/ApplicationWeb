let express = require('express');
let router = express.Router();
let activity_dao = require('../sport-track-db').activity_dao;
let activity_entry_dao = require('../sport-track-db').activity_entry_dao;

router.get('/', function(req, res, next) {
    if (req.session.sessionId) {
        activity_dao.findAll(function(rows) {
            let activities = [];
            rows.forEach((element) => {
                let arr = [];
                activity_entry_dao.findByKey(element.id, function (row) {
                    row.forEach((e) => {
                       arr.push({'time': e.time, 'cardio_frequency': e.cardio_frequency, 'latitude': e.latitude, 'longitude': e.longitude, 'altitude': e.altitude});
                   });

                    let cardio =arr.map(x => x['cardio_frequency']);
                    let time = arr.map(x => x['time']);

                    activities.push({'id': element.id, 'date': element.date, 'description': element.description, 'min_cardio': Math.min(cardio), 'max_cardio': Math.max(cardio), 'avg_cardio': (cardio.reduce((previous, current) => current += previous) / cardio.length), 'debut': Math.min(time), 'duree': (Math.max(time)-Math.min(time)), 'distance': calculDistanceTrajet(arr)});
                });
            });
            res.render('activities', {data:activities});
        });
    } else
        res.send('Vous n\'êtes pas authentifié');
});

function calculDistance2PointsGPS(lat1,long1,lat2,long2) {
    let R = 6378.137;
    return R*Math.acos(Math.sin(lat2)*Math.sin(lat1)+Math.cos(lat2)*Math.cos(lat1)*Math.cos(long2-long1));
}

function calculDistanceTrajet(activite) {
    let distance = 0;
    for (let i = 0 ; i < activite.length-1; i++) {
        distance = distance + calculDistance2PointsGPS(activite[i].latitude, activite[i].longitude, activite[i+1].latitude, activite[i+1].longitude);
    }
    return distance;
}

module.exports = router;