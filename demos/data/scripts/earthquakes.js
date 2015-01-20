var json2csv = require('json2csv');
var geo = require("geolib");
var fs = require("fs");

fs.readFile("../../data/all_month.geojson", 'utf8', function (err, json) {

  var quakes = JSON.parse(json).features;
  var fields = ['dsc', 'url', 'mag', 'lat', 'lng', 'distance'];

  var recs = []

  var sanFran = {latitude: 37.7833, longitude: -122.4167};

  var record;

  for (var i = 0; i < quakes.length; i++) {

    record = {
      dsc: quakes[i].properties.title,
      url: quakes[i].properties.url,
      mag: +quakes[i].properties.mag,
      lng: +quakes[i].geometry.coordinates[0],
      lat: +quakes[i].geometry.coordinates[1]
    };

    record.distance = geo.getDistance(record, sanFran) / 1609.34;
    recs.push(record);
  }

  recs.sort(function (a, b) { return a.distance - b.distance; });

  fs.writeFile('../../data/earthquakes.json', JSON.stringify(recs), function (err) {
    if (err) throw err;
    console.log('json saved');
  });

  json2csv({data: recs, fields: fields}, function (err, csv) {
    if (err) console.log(err);
    fs.writeFile('../../data/earthquakes.csv', csv, function (err) {
      if (err) throw err;
      console.log('csv saved');
    });
  });
});



