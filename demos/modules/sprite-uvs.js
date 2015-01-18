// This module takes the JSON ouput from Node-Sprite
// npm install node-sprite
// https://github.com/naltatis/node-sprite

export function uvMapper (images) {

  var spriteW = d3.max(images, function (d) {
    return d.width + d.positionX;
  });

  var spriteH = d3.max(images, function (d) {
    return d.height + d.positionY;
  });

  var getImageCoords = function (img) {
    return [
      [img.px1, img.py1],
      [img.px2, img.py1],
      [img.px2, img.py2],
      [img.px1, img.py2]
    ];
  };

  return function (item, i) {
    var coords = getImageCoords({
      px1: (item.positionX + item.width) / spriteW,
      py1: 1 - ((item.positionY + item.height) / spriteH),
      px2: item.positionX / spriteW,
      py2: 1 - (item.positionY / spriteH)
    });

    return new Float32Array(d3.merge([
      d3.merge(d3.permute(coords, [2, 3, 1])),
      d3.merge(d3.permute(coords, [0, 1, 2]))
    ]));
  };
}