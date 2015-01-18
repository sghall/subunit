var json2csv = require('json2csv');
var geo = require("geolib");
var fs = require("fs");

fs.readFile("demos/data/all_month.geojson", 'utf8', function (err, json) {

  var quakes = JSON.parse(json).features;
  var fields = ['title', 'url', 'magnitude', 'latitude', 'longitude', 'distance'];

  var recs = []

  var sanFran = {latitude: 37.7833, longitude: -122.4167};

  var record;

  for (var i = 0; i < quakes.length; i++) {

    record = {
      title: quakes[i].properties.title,
      url: quakes[i].properties.url,
      magnitude: +quakes[i].properties.mag,
      longitude: +quakes[i].geometry.coordinates[0],
      latitude: +quakes[i].geometry.coordinates[1]
    };

    record.distance = geo.getDistance(record, sanFran) / 1609.34;
    recs.push(record);
  }

  recs = recs.filter(function (d) {
    return d.distance < 100;
  }).sort(function (a, b) {
    return b.magnitude - a.magnitude; 
  });

  json2csv({data: recs, fields: fields}, function (err, csv) {
    if (err) console.log(err);
    fs.writeFile('earthquakes.csv', csv, function (err) {
      if (err) throw err;
      console.log('file saved');
    });
  });
});



