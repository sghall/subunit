var fs = require('fs');
var gm = require('gm');

var image = '../../images/world.jpg';

gm(image)
.size(function (err, size) {
  if (err) console.log(err);
  console.log("Image Size: ", size);
});

gm(image)
.identify(function (err, data) {
  if (!err) console.log(data)
});
