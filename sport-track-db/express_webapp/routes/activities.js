let express = require('express');
let router = express.Router();
let activity_dao = require('../sport-track-db').activity_dao;

router.get('/', function(req, res, next) {
    if (req.session.sessionId) {
        activity_dao.findAllWithData(req.session.sessionId, function(rows) {
            let activities = [];
            rows.forEach((element) => {
                if (!activities.some(function(o){return o["id"] === element.id ;})) {
                    let arr = [];
                    rows.forEach((e) => {
                        if (element.id === e.id)
                            arr.push({'time': e.time, 'cardio_frequency': e.cardio_frequency, 'latitude': e.latitude, 'longitude': e.longitude, 'altitude': e.altitude});
                    });

                    arr.sort(function (a, b) {
                        return new Date(Date.UTC(1970, 1, 1, a.time.split(":")[0], a.time.split(":")[1], a.time.split(":")[2], 0)).getTime()/1000
                            - new Date(Date.UTC(1970, 1, 1, b.time.split(":")[0], b.time.split(":")[1], b.time.split(":")[2], 0)).getTime()/1000;
                    });

                    let cardio = arr.map(x => x['cardio_frequency']);
                    let time = arr.map(x => new Date(Date.UTC(1970, 1, 1, x['time'].split(":")[0], x['time'].split(":")[1], x['time'].split(":")[2], 0)).getTime()/1000);

                    activities.push({'id': element.id, 'date': element.date, 'description': element.description, 'min_cardio': Math.min(...cardio), 'max_cardio': Math.max(...cardio), 'avg_cardio': Math.round((cardio.reduce((previous, current) => current += previous) / cardio.length)*100)/100, 'debut': new Date(Math.min(...time)*1000).getUTCHours() + ":" + new Date(Math.min(...time)*1000).getUTCMinutes() + ":" + new Date(Math.min(...time)*1000).getUTCSeconds(), 'duree': (Math.max(...time)-Math.min(...time)), 'distance': Math.round(calculDistanceTrajet(arr)*10000)/10000});
                }
            });
            res.render('activities', {data:activities});
        });
    } else
        res.render('message', {message:'Vous n\'êtes pas authentifié'});
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