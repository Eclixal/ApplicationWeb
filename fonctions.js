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

let t = JSON.parse('{\n' +
    '  "activity":{\n' +
    '    "date":"01/09/2018",\n' +
    '    "description": "IUT -> RU"\n' +
    '  },\n' +
    '  "data":[\n' +
    '    {"time":"13:00:00","cardio_frequency":99,"latitude":47.644795,"longitude":-2.776605,"altitude":18},\n' +
    '    {"time":"13:00:05","cardio_frequency":100,"latitude":47.646870,"longitude":-2.778911,"altitude":18},\n' +
    '    {"time":"13:00:10","cardio_frequency":102,"latitude":47.646197,"longitude":-2.780220,"altitude":18},\n' +
    '    {"time":"13:00:15","cardio_frequency":100,"latitude":47.646992,"longitude":-2.781068,"altitude":17},\n' +
    '    {"time":"13:00:20","cardio_frequency":98,"latitude":47.647867,"longitude":-2.781744,"altitude":16},\n' +
    '    {"time":"13:00:25","cardio_frequency":103,"latitude":47.648510,"longitude":-2.780145,"altitude":16}\n' +
    '  ]\n' +
    '}');

let data = [];
t.data.forEach((test) => {
    data.push({latitude: Math.PI*test.latitude/180, longitude: Math.PI*test.longitude/180});
});

console.log(calculDistanceTrajet(data));