var fs = require('fs');
var gm = require('gm');

var image = '../../images/zombies.jpg';
var output = '../../images/output.jpg';

gm(image)
.size(function (err, size) {
  if (err) console.log(err);
  console.log("Image Size: ", size);
});

// gm(image)
// .identify(function (err, data) {
//   if (!err) console.log(data)
// });

gm(image)
// .crop(512, 512)
.resize(2223,16383)
.write(output, function (err) {
  if (err) console.log(err);

  gm(output)
  .size(function (err, size) {
    if (err) console.log(err);
    console.log("New Image Size: ", size);
  });

});


