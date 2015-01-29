// var data2csv = require('data2csv');
// var geo = require("geolib");
var fs = require("fs");
var d3 = require("d3");

fs.readFile("../../data/worldcitiespop.txt", 'utf8', function (err, data) {

  var pairs = [], source, target;

  data = d3.shuffle(d3.csv.parse(data));

  var sources = data.slice(0, 1000);
  var targets = data.slice(1000, 2000);

  for (var i = 0; i < 1000; i++) {

    source = {};
    source.name    = sources[i].AccentCity;
    source.city    = sources[i].City;
    source.country = sources[i].Country;
    source.region  = sources[i].Region;
    source.lat     = +sources[i].Latitude;
    source.lng     = +sources[i].Longitude;

    target = {};
    target.name    = targets[i].AccentCity;
    target.city    = targets[i].City;
    target.country = targets[i].Country;
    target.region  = targets[i].Region;
    target.lat     = +targets[i].Latitude;
    target.lng     = +targets[i].Longitude;

    pairs.push({source: source, target: target})
  }

  fs.writeFile('../../data/random-city-pairs.json', JSON.stringify(pairs), function (err) {
    if (err) throw err;
    console.log('data saved');
  });
});



