let express = require('express');
let router = express.Router();
let activity_dao = require('../sport-track-db').activity_dao;
let activity_entry_dao = require('../sport-track-db').activity_entry_dao;
let formidable = require('formidable');
let fs = require('fs');

router.get('/', function(req, res, next) {
    if (req.session.sessionId) {
        res.render('upload');
    } else
        res.send('Vous devez être authentifié !');
});

router.post('/', function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        fs.readFile(files.activity_summary.path, (err, data) => {
            if (err) throw err;
            let activity = JSON.parse(data);

            if (activity.activity !== undefined && activity.activity.date !== undefined && activity.activity.description !== undefined) {
                activity_dao.insert([activity.activity.date, activity.activity.description, req.session.sessionId], (id) => {
                    let valide = true;
                    activity.data.forEach((element) => {
                        if (element.latitude === undefined
                            || element.longitude === undefined
                            || element.altitude === undefined
                            || element.time === undefined
                            || element.cardio_frequency === undefined)
                            valide = false;
                    });

                    if (valide) {
                        activity.data.forEach((element) => {
                            activity_entry_dao.insert([id, element.time, element.cardio_frequency, Math.PI*element.latitude/180, Math.PI*element.longitude/180, element.altitude]);
                        });
                        res.send('Votre activité a bien été traité');
                    } else
                        res.send('Le fichier n\'est pas valide !');
                });
            } else
                res.send('Le fichier n\'est pas valide !');


            //     // Les données sont valides on les ajoutes dans la BDD
            //     if ($valid) {
            //         ActivityDAO::getInstance()->insert($activity);
            //         foreach ($json->data as $activityD) {
            //             if (isset($activityD->latitude) && isset($activityD->longitude) && isset($activityD->altitude) && isset($activityD->time) && isset($activityD->cardio_frequency)) {
            //                 $dataActivity = new ActivityEntry();
            //                 $dataActivity->init(null, $activity->getId(), strtotime(date('m/d/Y', $activity->getDate()) . " " . $activityD->time), $activityD->cardio_frequency, pi()*$activityD->latitude/180, pi()*$activityD->longitude/180, $activityD->altitude);
            //                 ActivityEntryDAO::getInstance()->insert($dataActivity);
            //             }
            //         }
            //         header('Location: list_activities');
            //     }
            // }
        });
    });
});

module.exports = router;